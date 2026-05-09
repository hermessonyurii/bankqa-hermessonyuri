const { AppError } = require('../utils/errors');

function validateRegisterPayload(payload) {
  const { fullName, email, password, documentNumber } = payload;

  if (!fullName || fullName.trim().length < 3) {
    throw new AppError('Full name must have at least 3 characters.', 400);
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    throw new AppError('Email is invalid.', 400);
  }

  if (!password || password.length < 6) {
    throw new AppError('Password must have at least 6 characters.', 400);
  }

  if (!documentNumber || String(documentNumber).replace(/\D/g, '').length < 11) {
    throw new AppError('Document number is invalid.', 400);
  }
}

function validateLoginPayload(payload) {
  const { email, password } = payload;

  if (!email || !password) {
    throw new AppError('Email and password are required.', 400);
  }
}

module.exports = {
  validateRegisterPayload,
  validateLoginPayload
};
