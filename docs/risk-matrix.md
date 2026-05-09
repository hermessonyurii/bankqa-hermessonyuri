# Matriz de Riscos

| Risco | Probabilidade | Impacto | Mitigação | Status |
|---|---|---|---|---|
| Saldo inconsistente após transações | Alta | Crítico | Transações com `FOR UPDATE` e rollback | Mitigado |
| Acesso sem autenticação | Alta | Crítico | Middleware JWT obrigatório | Mitigado |
| Valores negativos aceitos | Média | Alto | Validação de `amount > 0` | Mitigado |
| Conta inexistente em transferência | Média | Alto | Validação de destino existente | Mitigado |
| Exposição de dados sensíveis | Baixa | Médio | Hash de senha e mensagens de erro genéricas | Mitigado |
| Deadlock em transferências concorrentes | Baixa | Médio | Lock order determinístico | Parcial |
| Falha de pipeline CI | Baixa | Baixo | Healthcheck e retries | Mitigado |