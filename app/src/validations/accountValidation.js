const { AppError } = require('../utils/errors');
const { normalizeAmount } = require('../utils/money');

function validateDepositPayload(payload) {
  if (!payload || payload.amount === undefined) {
    throw new AppError('Amount is required.', 400);
  }

  return {
    amount: normalizeAmount(payload.amount),
    description: payload.description?.trim() || 'Deposit via API'
  };
}

function validateWithdrawPayload(payload) {
  if (!payload || payload.amount === undefined) {
    throw new AppError('Amount is required.', 400);
  }

  return {
    amount: normalizeAmount(payload.amount),
    description: payload.description?.trim() || 'Withdraw via API'
  };
}

function validateTransferPayload(payload) {
  if (!payload?.destinationAccountNumber) {
    throw new AppError('Destination account number is required.', 400);
  }

  return {
    destinationAccountNumber: String(payload.destinationAccountNumber).trim(),
    amount: normalizeAmount(payload.amount),
    description: payload.description?.trim() || 'Transfer via API'
  };
}

module.exports = {
  validateDepositPayload,
  validateWithdrawPayload,
  validateTransferPayload
};
