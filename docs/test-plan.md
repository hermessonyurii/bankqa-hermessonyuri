# Plano de Testes

## Escopo
Testar funcionalidades de sistema bancário simples: cadastro, login, depósito, saque, transferência e extrato.

## Ambiente de Teste
- Docker Compose com MySQL e Node.js.
- Dados seed: usuário `hermesson.yuri.qa@example.com` com senha `Password123!` e conta `260000000111`.
- Conta destino: `260000000222`.

## Casos de Teste Planejados
### E2E
- Cadastro de usuário.
- Login.
- Depósito.
- Saque.
- Transferência.
- Extrato.

### API
- Healthcheck.
- Registro.
- Login.
- Operações de conta (com/sem token).

### Negativos
- Saque maior que saldo.
- Transferência inválida.
- Payloads incorretos.

## Dados de Teste
- Usuários únicos gerados dinamicamente.
- Valores fixos para operações (ex: R$ 100,00).

## Critérios de Saída
- Todos os testes passam.
- Cobertura de cenários críticos.
- Relatório de execução gerado.