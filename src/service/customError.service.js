export class CustomError {
  static createError({ name = "error", cause, message, errorCode }) {
    const error = new Error(message, { cause });
    error.name = name;
    error.cause = cause;
    error.message = message;
    error.errorCode = errorCode;
    return error;
  }
}
