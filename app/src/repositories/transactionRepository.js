const { getPool } = require('../config/db');

async function listTransactionsByAccountId(accountId) {
  const [rows] = await getPool().execute(
    `SELECT id, transaction_type, amount, description, reference_account_number, created_at
     FROM transactions
     WHERE account_id = ?
     ORDER BY id DESC`,
    [accountId]
  );

  return rows;
}

module.exports = {
  listTransactionsByAccountId
};
