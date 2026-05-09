const { getPool } = require('../config/db');

async function findUserByEmail(email) {
  const [rows] = await getPool().execute(
    'SELECT id, full_name, email, password_hash, document_number FROM users WHERE email = ? LIMIT 1',
    [email]
  );

  return rows[0] || null;
}

async function findUserById(userId) {
  const [rows] = await getPool().execute(
    'SELECT id, full_name, email, document_number, created_at FROM users WHERE id = ? LIMIT 1',
    [userId]
  );

  return rows[0] || null;
}

async function createUser({ fullName, email, passwordHash, documentNumber }) {
  const [result] = await getPool().execute(
    `INSERT INTO users (full_name, email, password_hash, document_number)
     VALUES (?, ?, ?, ?)`,
    [fullName, email, passwordHash, documentNumber]
  );

  return result.insertId;
}

module.exports = {
  findUserByEmail,
  findUserById,
  createUser
};
