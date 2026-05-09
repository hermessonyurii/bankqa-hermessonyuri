const { AppError } = require('./errors');

function normalizeAmount(value) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    throw new AppError('Amount must be a valid number.', 400);
  }

  if (amount <= 0) {
    throw new AppError('Amount must be greater than zero.', 400);
  }

  return Number(amount.toFixed(2));
}

module.exports = {
  normalizeAmount
};
