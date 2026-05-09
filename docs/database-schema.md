# Schema do Banco de Dados

## Tabelas

### users
- `id` BIGINT PRIMARY KEY AUTO_INCREMENT
- `full_name` VARCHAR(150) NOT NULL
- `email` VARCHAR(150) NOT NULL UNIQUE
- `password_hash` VARCHAR(255) NOT NULL
- `document_number` VARCHAR(20) NOT NULL UNIQUE
- `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP

### accounts
- `id` BIGINT PRIMARY KEY AUTO_INCREMENT
- `user_id` BIGINT NOT NULL (FK para users.id)
- `account_number` VARCHAR(20) NOT NULL UNIQUE
- `balance` DECIMAL(15,2) NOT NULL DEFAULT 0.00
- `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP

### transactions
- `id` BIGINT PRIMARY KEY AUTO_INCREMENT
- `account_id` BIGINT NOT NULL (FK para accounts.id)
- `transaction_type` ENUM('DEPOSIT', 'WITHDRAW', 'TRANSFER_OUT', 'TRANSFER_IN') NOT NULL
- `amount` DECIMAL(15,2) NOT NULL
- `description` VARCHAR(255) NULL
- `reference_account_number` VARCHAR(20) NULL
- `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP

## Relacionamentos
- users 1:N accounts
- accounts 1:N transactions

## Decisões Técnicas
- `DECIMAL(15,2)` para evitar problemas de precisão com dinheiro.
- Chaves estrangeiras garantem integridade referencial.
- Índices implícitos em FKs para performance.