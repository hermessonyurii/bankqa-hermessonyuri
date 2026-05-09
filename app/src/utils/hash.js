const bcrypt = require('bcryptjs');

function getSaltRounds() {
  return Number(process.env.BCRYPT_SALT_ROUNDS || 10);
}

async function hashPassword(password) {
  return bcrypt.hash(password, getSaltRounds());
}

async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

module.exports = {
  hashPassword,
  comparePassword
};
