import Koa from 'koa';

import { createLogger, applyMiddleware, installGraphQLServer } from './global';

export const createApp = async (): Promise<Koa> => {
  const logger = createLogger('app');

  logger.info('Start creation of app');

  const app = new Koa();

  applyMiddleware(app, logger);

  await installGraphQLServer(app, logger);

  return app;
};
