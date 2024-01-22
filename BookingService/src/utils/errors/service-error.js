const { InternalServerError } = require("http-errors");
class ServiceError extends Error {
  constructor(
    message = "Something went wrong",
    explanation = "Service layer error",
    statusCode = InternalServerError
  ) {
    super();
    this.name = "ServiceError";
    this.message = message;
    this.explanation = explanation;
    this.statusCode = statusCode;
  }
}

module.exports = ServiceError;
