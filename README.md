# API de alunos backend

API em Node.js com Express e Sequelize para cadastro, login, listagem, edição e exclusão de alunos.

## Rotas principais

- `GET /usuario`, `GET /usuario/:id`
- `POST /usuario/register`, `POST /usuario/login`
- `PUT /usuario/:id`, `DELETE /usuario/:id`
- `GET /aluno`, `GET /aluno/:id`
- `POST /aluno/register`, `POST /aluno/login`
- `PUT /aluno/:id`, `DELETE /aluno/:id`

## Campos usados

- `id_aluno`
- `nome_completo`
- `usuario_acesso`
- `senha_hash`
- `email_aluno`
- `observacao`
- `foto`
- `data_cadastro`
