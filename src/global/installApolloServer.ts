import { loadFiles } from '@graphql-toolkit/file-loading';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-koa';
import type { IResolvers } from 'apollo-server-koa';
import { GraphQLSchema } from 'graphql';
import type Koa from 'koa';
import { join } from 'path';

import { getConfig } from './config';
import { transformGraphQLError } from './error';

const ENABLE_GRAPHQL_PLAYGROUND = getConfig<boolean>(
  'ENABLE_GRAPHQL_PLAYGROUND',
);
const ENABLE_GRAPHQL_INTROSPECTION = getConfig<boolean>(
  'ENABLE_GRAPHQL_INTROSPECTION',
);
const EXPOSE_ERROR_STACK_TRACES = getConfig<boolean>(
  'EXPOSE_ERROR_STACK_TRACES',
);

const bootstrapSchema = (): GraphQLSchema => {
  const typeDefs = loadFiles<string>(
    join(__dirname, '../modules/**/*.typeDefs.gql'),
  );
  const resolvers = loadFiles<IResolvers>(
    join(__dirname, '../modules/**/*.resolvers.*'),
  );
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  return schema;
};

const installApolloServer = (app: Koa): void => {
  const schema = bootstrapSchema();
  const apolloServer = new ApolloServer({
    schema,
    debug: EXPOSE_ERROR_STACK_TRACES,
    playground: ENABLE_GRAPHQL_PLAYGROUND,
    introspection: ENABLE_GRAPHQL_INTROSPECTION,
    formatError: transformGraphQLError,
  });
  apolloServer.applyMiddleware({ app });
};

export { installApolloServer };
