# Casos de Teste Manuais

## Cadastro de Usuário
1. Acesse `/register`.
2. Preencha dados válidos.
3. Clique em "Cadastrar".
4. Verifique mensagem de sucesso e conta gerada.

## Login
1. Acesse `/login`.
2. Use credenciais válidas.
3. Verifique redirecionamento para `/dashboard`.

## Depósito
1. Faça login.
2. Digite valor positivo.
3. Clique em "Depositar".
4. Verifique atualização de saldo e extrato.

## Saque
1. Faça login.
2. Digite valor menor que saldo.
3. Clique em "Sacar".
4. Verifique saldo reduzido.

## Transferência
1. Faça login.
2. Digite conta destino válida e valor.
3. Clique em "Transferir".
4. Verifique saldo reduzido e mensagem.

## Cenários Negativos
- Tentar saque maior que saldo: erro "Insufficient balance".
- Transferência para conta inexistente: erro "Destination account not found".
- Valores negativos: erro "Amount must be greater than zero".