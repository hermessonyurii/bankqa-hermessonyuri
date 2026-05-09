const accountService = require('../services/accountService');
const {
  validateDepositPayload,
  validateWithdrawPayload,
  validateTransferPayload
} = require('../validations/accountValidation');

async function getSummary(req, res, next) {
  try {
    const data = await accountService.getAccountSummary(req.user.id);

    return res.status(200).json({
      message: 'Account summary loaded successfully.',
      data
    });
  } catch (error) {
    return next(error);
  }
}

async function deposit(req, res, next) {
  try {
    const payload = validateDepositPayload(req.body);
    const data = await accountService.deposit({
      userId: req.user.id,
      ...payload
    });

    return res.status(200).json({
      message: 'Deposit completed successfully.',
      data
    });
  } catch (error) {
    return next(error);
  }
}

async function withdraw(req, res, next) {
  try {
    const payload = validateWithdrawPayload(req.body);
    const data = await accountService.withdraw({
      userId: req.user.id,
      ...payload
    });

    return res.status(200).json({
      message: 'Withdraw completed successfully.',
      data
    });
  } catch (error) {
    return next(error);
  }
}

async function transfer(req, res, next) {
  try {
    const payload = validateTransferPayload(req.body);
    const data = await accountService.transfer({
      userId: req.user.id,
      ...payload
    });

    return res.status(200).json({
      message: 'Transfer completed successfully.',
      data
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getSummary,
  deposit,
  withdraw,
  transfer
};
