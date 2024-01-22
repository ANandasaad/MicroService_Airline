const AppError = require("./error-handlers");
const { StatusCodes } = require("http-status-codes");
class ClientError extends AppError {
  constructor(error) {
    super();
    error.name,
      "Not able to validate the data sent to the request",
      error.explanation,
      StatusCodes.BAD_REQUEST;
  }
}

module.exports = ClientError;
