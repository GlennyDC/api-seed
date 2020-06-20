import { ApolloServer } from 'apollo-server-koa';
import Koa from 'koa';

import { config } from './config';
import { transformGraphQLError } from './core';
import makeSchema from './schema/makeSchema';

const EXPOSE_ERROR_STACKTRACES = config.server.graphql.exposeErrorStackTraces;

const installApolloServer = (app: Koa): void => {
  const schema = makeSchema();
  const apolloServer = new ApolloServer({
    schema,
    debug: EXPOSE_ERROR_STACKTRACES,
    formatError: transformGraphQLError,
  });
  apolloServer.applyMiddleware({ app });
};

export { installApolloServer };
