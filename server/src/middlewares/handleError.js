import APIError from "../utils/apiError";

function handleError(app) {
  // * Catching error 404.
  app.use((req, res, next) => {
    return next(new APIError(404, "Resources Not Found!"));
  });

  // * Catching error server.
  app.use((error, req, res, next) => {
    const statusCode = error.code || 500;
    const message = error.message || "Server Error!";

    return res.status(statusCode).json({
      message,
      name: error.name,
      exception: error.stack,
    });
  });
}

export default handleError;
