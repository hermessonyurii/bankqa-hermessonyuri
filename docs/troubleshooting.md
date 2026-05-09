# Troubleshooting

## Problemas Comuns

### Docker Compose não sobe
- Verifique se portas 3000 e 3307 estão livres.
- Execute `docker compose logs db` para ver erros do MySQL.
- Limpe volumes: `docker compose down -v`.

### Testes Cypress falham
- Certifique-se de que a API está saudável: `curl http://localhost:3000/api/health`.
- Verifique variáveis de ambiente em `.env`.
- Execute `npm run test:open` para debug interativo.

### Erro de conexão com DB
- Confirme que `.env` tem `DB_HOST=db`.
- Aguarde healthcheck do MySQL (pode levar até 30s).

### Pipeline CI falha
- Verifique logs do GitHub Actions.
- Certifique-se de que `docker compose up` completa sem erros.
- Timeout de healthcheck pode precisar ajuste.

## Comandos Úteis
- Limpar tudo: `docker compose down -v && docker system prune -f`
- Ver logs: `docker compose logs`
- Executar apenas API: `npm run dev -w app`