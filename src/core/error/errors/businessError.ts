import { ErrorCode } from '../errorCode';
import { BaseError } from './baseError';

/**
 * Error class for all requests that are invalid due to business / domain logic.
 * For example:
 * - you cannot destroy a house if it still has residents
 * - you cannot extract money from an empty bank account
 *
 * @see {@link https://tools.ietf.org/html/rfc7231#section-6.5.8|409 Conflict}
 */
class BusinessError extends BaseError {
  constructor(message: string, code: ErrorCode) {
    super(message, code, 409);
  }
}

export { BusinessError };
