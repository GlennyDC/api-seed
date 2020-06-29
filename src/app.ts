import Koa from 'koa';

import { makeLogger, applyMiddleware } from './core';
import { installApolloServer } from './installApolloServer';

const logger = makeLogger('app');

const app = new Koa();

applyMiddleware(app);

installApolloServer(app);

// Log any handled Koa error (will probably never occur
// except for 404 Not found)
app.on('error', (err) => {
  logger.info(
    'Following error was correctly handled in error middleware: ',
    err,
  );
});

export { app };
