import { ErrorCode } from '../errorCode';
import { BaseError } from './baseError';

class RequestError extends BaseError {
  constructor(wrappedError?: Error) {
    super('Bad gateway', ErrorCode.REQUEST_FAILED, 502, wrappedError);
  }
}

export { RequestError };
