const mysql = require('mysql2/promise');

let pool;

/**
 * Aqui eu centralizo a conexão com o MySQL.
 * A ideia é deixar o resto da aplicação dependente de um pool só,
 * evitando abrir conexão manual em cada módulo.
 */
function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 3306),
      database: process.env.DB_NAME || 'bankqa',
      user: process.env.DB_USER || 'bankqa_user',
      password: process.env.DB_PASSWORD || 'bankqa_pass',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      decimalNumbers: true
    });
  }

  return pool;
}

async function getConnection() {
  return getPool().getConnection();
}

module.exports = {
  getPool,
  getConnection
};
