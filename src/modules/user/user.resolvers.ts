import Joi from 'joi';

import { Resolvers, createLogger, validateArgs } from '../../global';
import { Auth, User } from './user';
import * as userService from './user.service';

const logger = createLogger('user-resolvers');

const UserResolvers: Resolvers = {
  Mutation: {
    register: async (_, args): Promise<Auth> => {
      logger.silly(`Register user with email address [${args.emailAddress}]`);

      const schema = Joi.object({
        emailAddress: Joi.string().email(),
        password: Joi.string().min(6),
      });

      const { emailAddress, password } = await validateArgs(args, schema);

      return userService.register(emailAddress, password);
    },
    login: async (_, args): Promise<Auth> => {
      logger.silly(`Login user with email address [${args.emailAddress}]`);

      const schema = Joi.object({
        emailAddress: Joi.string().email(),
        password: Joi.string().min(6),
      });

      const { emailAddress, password } = await validateArgs(args, schema);

      return userService.login(emailAddress, password);
    },
    updateUser: async (_, args): Promise<User> => {
      logger.silly(`Update user [${args.id}]`);

      // TODO: get id from JWT

      const schema = Joi.object({
        id: Joi.string(),
        user: Joi.object({
          emailAddress: Joi.string().email().optional(),
          password: Joi.string().email().optional(),
        }).or('emailAddress', 'password'),
      });

      const { id, user } = await validateArgs(args, schema);

      return userService.updateUserById(id, user);
    },
  },
};

export default UserResolvers;
