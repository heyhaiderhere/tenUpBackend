const routeNotFound = (req, res, next) => {
  const error = new Error(`This is an invalid route ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
  });
  next();
};

export { errorHandler, routeNotFound };
