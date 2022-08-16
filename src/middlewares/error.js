const errorLogger = (err, req, res, next) => {
  console.error(err);
  next(err);
};

const errorResponder = (err, req, res, next) => {
  const { status, message, isCustom } = err;
  if (isCustom) res.status(status).json({ message: message });
  else {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { errorLogger, errorResponder };
