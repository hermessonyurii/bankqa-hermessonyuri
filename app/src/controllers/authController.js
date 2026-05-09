const authService = require('../services/authService');
const { validateRegisterPayload, validateLoginPayload } = require('../validations/authValidation');

async function register(req, res, next) {
  try {
    validateRegisterPayload(req.body);
    const data = await authService.registerUser(req.body);

    return res.status(201).json({
      message: 'User registered successfully.',
      data
    });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    validateLoginPayload(req.body);
    const data = await authService.loginUser(req.body);

    return res.status(200).json({
      message: 'Login completed successfully.',
      data
    });
  } catch (error) {
    return next(error);
  }
}

async function health(req, res, next) {
  try {
    await authService.healthcheck();
    return res.status(200).json({
      status: 'ok',
      project: 'bankqa-hermessonyuri-portfolio'
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  register,
  login,
  health
};
