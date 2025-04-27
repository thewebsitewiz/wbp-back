// not Found Handler

const notFound = (req, res, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Error Handler
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
  console.error(err.stack);
  res.status(statusCode).json({
    success: false,
    message: err?.message || "Internal Server Error",
    stack: err?.stack,
  });
};

module.exports = { errorHandler, notFound };
