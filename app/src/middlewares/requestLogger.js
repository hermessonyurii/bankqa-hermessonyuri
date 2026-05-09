function requestLogger(req, res, next) {
  console.log(`[bankqa-hermessonyuri-portfolio] ${req.method} ${req.originalUrl}`);
  next();
}

module.exports = {
  requestLogger
};
