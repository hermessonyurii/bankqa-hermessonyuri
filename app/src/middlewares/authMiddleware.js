const { verifyToken } = require('../utils/jwt');
const { AppError } = require('../utils/errors');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new AppError('Authorization header is required.', 401));
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(new AppError('Invalid authorization header format.', 401));
  }

  try {
    const payload = verifyToken(token);
    req.user = {
      id: payload.sub,
      email: payload.email,
      accountNumber: payload.accountNumber
    };

    return next();
  } catch (error) {
    return next(new AppError('Invalid or expired token.', 401));
  }
}

module.exports = {
  authMiddleware
};
