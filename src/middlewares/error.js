const errorLogger = (err, req, res, next) => {
  console.error(err);
  next(err);
};

const errorResponder = (err, req, res, next) => {
  const { status, message } = err;
  res.status(status || 500).json({ message: message || "Server Error" });
};

module.exports = { errorLogger, errorResponder };
