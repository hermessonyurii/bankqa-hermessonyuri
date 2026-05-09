# Estratégia de Testes

## Objetivo
Esta estratégia define a abordagem de testes para o projeto BankQA, focando em validar regras de negócio bancárias, segurança e usabilidade através de testes automatizados e manuais.

## Tipos de Testes Implementados
- **E2E (End-to-End)**: Cypress para fluxos completos de usuário (cadastro, login, operações bancárias).
- **API Testing**: Validação de endpoints REST, payloads e respostas.
- **Manual Testing**: Casos críticos não automatizados, como validação visual e exploração de borda.

## Critérios de Aceitação
- Cobertura de cenários felizes e negativos.
- Validação de regras financeiras (saldo, transações).
- Segurança básica (autenticação, autorização).
- Relatórios de execução com evidências.

## Ferramentas
- Cypress para E2E e API.
- Postman para exploração manual.
- GitHub Actions para CI/CD.

## Riscos Mitigados
- Inconsistência de saldo.
- Acesso não autorizado.
- Dados inválidos causando falhas.