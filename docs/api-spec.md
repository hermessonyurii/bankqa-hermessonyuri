# Especificação da API

## Endpoints

### Health
- `GET /api/health`
  - Response: `{ "status": "ok", "project": "bankqa-hermessonyuri-portfolio" }`

### Auth
- `POST /api/auth/register`
  - Payload: `{ "fullName": "string", "email": "string", "documentNumber": "string", "password": "string" }`
  - Response: `{ "message": "User registered successfully.", "data": { user, account } }`
- `POST /api/auth/login`
  - Payload: `{ "email": "string", "password": "string" }`
  - Response: `{ "message": "Login completed successfully.", "data": { token, user, account } }`

### Account
- `GET /api/account/summary` (Autenticado)
  - Response: `{ "message": "Account summary loaded successfully.", "data": { account, statement } }`
- `POST /api/account/deposit` (Autenticado)
  - Payload: `{ "amount": number, "description": "string" }`
  - Response: `{ "message": "Deposit completed successfully.", "data": { accountNumber, previousBalance, currentBalance } }`
- `POST /api/account/withdraw` (Autenticado)
  - Payload: `{ "amount": number, "description": "string" }`
  - Response: `{ "message": "Withdraw completed successfully.", "data": { accountNumber, previousBalance, currentBalance } }`
- `POST /api/account/transfer` (Autenticado)
  - Payload: `{ "destinationAccountNumber": "string", "amount": number, "description": "string" }`
  - Response: `{ "message": "Transfer completed successfully.", "data": { sourceAccountNumber, destinationAccountNumber, sourcePreviousBalance, sourceCurrentBalance } }`

## Status Codes
- 200: Sucesso
- 201: Criado
- 400: Payload inválido
- 401: Não autorizado
- 404: Não encontrado
- 409: Conflito (ex: email já registrado)
- 422: Regra de negócio violada (ex: saldo insuficiente)
- 500: Erro interno