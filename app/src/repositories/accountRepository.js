const { getPool } = require('../config/db');

async function createAccount(userId, accountNumber, initialBalance = 0) {
  const [result] = await getPool().execute(
    `INSERT INTO accounts (user_id, account_number, balance)
     VALUES (?, ?, ?)`,
    [userId, accountNumber, initialBalance]
  );

  return result.insertId;
}

async function findAccountByUserId(userId) {
  const [rows] = await getPool().execute(
    `SELECT id, user_id, account_number, balance, created_at
     FROM accounts
     WHERE user_id = ?
     LIMIT 1`,
    [userId]
  );

  return rows[0] || null;
}

async function findAccountByNumber(accountNumber) {
  const [rows] = await getPool().execute(
    `SELECT id, user_id, account_number, balance, created_at
     FROM accounts
     WHERE account_number = ?
     LIMIT 1`,
    [accountNumber]
  );

  return rows[0] || null;
}

module.exports = {
  createAccount,
  findAccountByUserId,
  findAccountByNumber
};
