const userRepository = require('../repositories/userRepository');
const accountRepository = require('../repositories/accountRepository');
const { hashPassword, comparePassword } = require('../utils/hash');
const { signToken } = require('../utils/jwt');
const { AppError } = require('../utils/errors');
const { getPool } = require('../config/db');

function generateAccountNumber() {
  const suffix = String(Date.now()).slice(-6);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `260${suffix}${random}`;
}

/**
 * Aqui eu deixei o cadastro com criação de conta já no mesmo fluxo.
 * Em sistema financeiro, eu prefiro evitar cadastro "meio concluído".
 * Então usuário e conta nascem juntos para facilitar teste e rastreabilidade.
 */
async function registerUser(payload) {
  const existingUser = await userRepository.findUserByEmail(payload.email);

  if (existingUser) {
    throw new AppError('Email is already registered.', 409);
  }

  const passwordHash = await hashPassword(payload.password);
  const userId = await userRepository.createUser({
    fullName: payload.fullName.trim(),
    email: payload.email.trim().toLowerCase(),
    passwordHash,
    documentNumber: String(payload.documentNumber).replace(/\D/g, '')
  });

  const accountNumber = generateAccountNumber();
  await accountRepository.createAccount(userId, accountNumber, 0);

  const user = await userRepository.findUserById(userId);
  const account = await accountRepository.findAccountByUserId(userId);

  return {
    user,
    account
  };
}

async function loginUser({ email, password }) {
  const user = await userRepository.findUserByEmail(email.trim().toLowerCase());

  if (!user) {
    throw new AppError('Invalid credentials.', 401);
  }

  const passwordMatches = await comparePassword(password, user.password_hash);

  if (!passwordMatches) {
    throw new AppError('Invalid credentials.', 401);
  }

  const account = await accountRepository.findAccountByUserId(user.id);
  const token = signToken({
    sub: user.id,
    email: user.email,
    accountNumber: account.account_number
  });

  return {
    token,
    user: {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      documentNumber: user.document_number
    },
    account
  };
}

async function healthcheck() {
  const [rows] = await getPool().query('SELECT 1 AS ok');
  return rows[0];
}

module.exports = {
  registerUser,
  loginUser,
  healthcheck
};
