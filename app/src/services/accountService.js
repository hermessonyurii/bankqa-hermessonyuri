const { getConnection } = require('../config/db');
const accountRepository = require('../repositories/accountRepository');
const transactionRepository = require('../repositories/transactionRepository');
const { AppError } = require('../utils/errors');

/**
 * Este service concentra as regras financeiras.
 * Controller fica leve e a parte crítica de saldo/extrato fica num lugar só.
 */
async function getAccountSummary(userId) {
  const account = await accountRepository.findAccountByUserId(userId);

  if (!account) {
    throw new AppError('Account not found.', 404);
  }

  const statement = await transactionRepository.listTransactionsByAccountId(account.id);

  return {
    account,
    statement
  };
}

async function deposit({ userId, amount, description }) {
  const connection = await getConnection();

  try {
    await connection.beginTransaction();

    const [accounts] = await connection.execute(
      `SELECT id, user_id, account_number, balance
       FROM accounts
       WHERE user_id = ?
       FOR UPDATE`,
      [userId]
    );

    const account = accounts[0];

    if (!account) {
      throw new AppError('Account not found.', 404);
    }

    const updatedBalance = Number(account.balance) + Number(amount);

    await connection.execute(
      'UPDATE accounts SET balance = ? WHERE id = ?',
      [updatedBalance, account.id]
    );

    await connection.execute(
      `INSERT INTO transactions (account_id, transaction_type, amount, description, reference_account_number)
       VALUES (?, 'DEPOSIT', ?, ?, NULL)`,
      [account.id, amount, description]
    );

    await connection.commit();

    return {
      accountNumber: account.account_number,
      previousBalance: Number(account.balance),
      currentBalance: Number(updatedBalance.toFixed(2))
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function withdraw({ userId, amount, description }) {
  const connection = await getConnection();

  try {
    await connection.beginTransaction();

    const [accounts] = await connection.execute(
      `SELECT id, user_id, account_number, balance
       FROM accounts
       WHERE user_id = ?
       FOR UPDATE`,
      [userId]
    );

    const account = accounts[0];

    if (!account) {
      throw new AppError('Account not found.', 404);
    }

    if (Number(account.balance) < Number(amount)) {
      throw new AppError('Insufficient balance.', 422);
    }

    const updatedBalance = Number(account.balance) - Number(amount);

    await connection.execute(
      'UPDATE accounts SET balance = ? WHERE id = ?',
      [updatedBalance, account.id]
    );

    await connection.execute(
      `INSERT INTO transactions (account_id, transaction_type, amount, description, reference_account_number)
       VALUES (?, 'WITHDRAW', ?, ?, NULL)`,
      [account.id, amount, description]
    );

    await connection.commit();

    return {
      accountNumber: account.account_number,
      previousBalance: Number(account.balance),
      currentBalance: Number(updatedBalance.toFixed(2))
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function transfer({ userId, destinationAccountNumber, amount, description }) {
  const connection = await getConnection();

  try {
    await connection.beginTransaction();

    const [sourceRows] = await connection.execute(
      `SELECT id, user_id, account_number, balance
       FROM accounts
       WHERE user_id = ?
       FOR UPDATE`,
      [userId]
    );

    const sourceAccount = sourceRows[0];

    if (!sourceAccount) {
      throw new AppError('Source account not found.', 404);
    }

    const [destinationRows] = await connection.execute(
      `SELECT id, user_id, account_number, balance
       FROM accounts
       WHERE account_number = ?
       FOR UPDATE`,
      [destinationAccountNumber]
    );

    const destinationAccount = destinationRows[0];

    if (!destinationAccount) {
      throw new AppError('Destination account not found.', 404);
    }

    if (destinationAccount.account_number === sourceAccount.account_number) {
      throw new AppError('You cannot transfer to the same account.', 422);
    }

    if (Number(sourceAccount.balance) < Number(amount)) {
      throw new AppError('Insufficient balance.', 422);
    }

    const sourceUpdatedBalance = Number(sourceAccount.balance) - Number(amount);
    const destinationUpdatedBalance = Number(destinationAccount.balance) + Number(amount);

    await connection.execute(
      'UPDATE accounts SET balance = ? WHERE id = ?',
      [sourceUpdatedBalance, sourceAccount.id]
    );

    await connection.execute(
      'UPDATE accounts SET balance = ? WHERE id = ?',
      [destinationUpdatedBalance, destinationAccount.id]
    );

    await connection.execute(
      `INSERT INTO transactions (account_id, transaction_type, amount, description, reference_account_number)
       VALUES (?, 'TRANSFER_OUT', ?, ?, ?)`,
      [sourceAccount.id, amount, description, destinationAccount.account_number]
    );

    await connection.execute(
      `INSERT INTO transactions (account_id, transaction_type, amount, description, reference_account_number)
       VALUES (?, 'TRANSFER_IN', ?, ?, ?)`,
      [destinationAccount.id, amount, description, sourceAccount.account_number]
    );

    await connection.commit();

    return {
      sourceAccountNumber: sourceAccount.account_number,
      destinationAccountNumber: destinationAccount.account_number,
      sourcePreviousBalance: Number(sourceAccount.balance),
      sourceCurrentBalance: Number(sourceUpdatedBalance.toFixed(2))
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = {
  getAccountSummary,
  deposit,
  withdraw,
  transfer
};
