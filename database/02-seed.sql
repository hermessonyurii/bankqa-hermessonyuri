INSERT INTO users (id, full_name, email, password_hash, document_number) VALUES
  (1, 'Hermesson Yuri', 'hermesson.yuri.qa@example.com', '$2a$10$J/aSFGXUeXsxEn4aZOQLi.QS5nFZW3swGxQdVhFy9VR5uyUFYofEe', '12345678901'),
  (2, 'Conta Destino QA', 'qa.destino@example.com', '$2a$10$J/aSFGXUeXsxEn4aZOQLi.QS5nFZW3swGxQdVhFy9VR5uyUFYofEe', '10987654321')
ON DUPLICATE KEY UPDATE full_name = VALUES(full_name);

INSERT INTO accounts (id, user_id, account_number, balance) VALUES
  (1, 1, '260000000111', 1500.00),
  (2, 2, '260000000222', 500.00)
ON DUPLICATE KEY UPDATE balance = VALUES(balance);

INSERT INTO transactions (account_id, transaction_type, amount, description, reference_account_number) VALUES
  (1, 'DEPOSIT', 1500.00, 'Initial seed balance for Hermesson Yuri', NULL),
  (2, 'DEPOSIT', 500.00, 'Initial seed balance for destination account', NULL);
