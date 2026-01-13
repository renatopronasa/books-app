# Books App 📚

**Aplicação para gerenciamento e visualização de livros** com backend em Node.js/Express + MySQL e frontend em React.

---

## 🔧 Funcionalidades

- Listar livros, buscar por termo
- Visualizar detalhes de um livro
- Criar, editar e remover livros (com upload de imagem)
- API REST simples e frontend com React

---

## 🚀 Tecnologias

- Backend: Node.js, Express, MySQL (mysql2), Multer
- Frontend: React (Create React App), Axios, Tailwind CSS
- Dev/Test: Jest, Supertest, Nodemon
- Orquestração (opcional): Docker & Docker Compose

---

## 📦 Requisitos

- Node.js (>= 18 recomendado)
- npm ou yarn
- Docker & Docker Compose (recomendado para ambiente completo)

---

## Início rápido

### Opção A — Usar Docker Compose (recomendado)

1. Na raiz do projeto, execute:

```bash
docker-compose up --build
```

2. O Compose sobe:
- MySQL (container `books_mysql`) com banco `booksdb` (script de inicialização em `backend/db/init.sql`)
- API (container `books_api`) na porta **3001**

> Observação: o serviço `backend` lê variáveis do arquivo `backend/.env` (o Compose referencia `./backend/.env`). Quando executado via Docker Compose, a variável `DB_HOST` pode ser `mysql` (nome do serviço). Caso rode o backend localmente, use `DB_HOST=127.0.0.1` e ajuste conforme sua configuração.

### Opção B — Rodar localmente (sem Docker)

Backend:

```bash
cd backend
npm install
# criar um arquivo .env (ex.: backend/.env) com as variáveis abaixo
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm start
```

Acesse o frontend em: http://localhost:3000 (o frontend espera a API em http://localhost:3001)

---

## Variáveis de ambiente (exemplo `backend/.env`)

```env
PORT=3001
DB_HOST=mysql
DB_USER=root
DB_PASSWORD=root
DB_NAME=booksdb
```

> Se iniciar com Docker Compose, `DB_HOST` = `mysql` (nome do serviço). Para conectar a um MySQL em execução localmente use `DB_HOST=127.0.0.1` e ajuste porta conforme necessário.

---

## Endpoints da API 📡

Base: `http://localhost:3001` (quando em Docker Compose, o container backend escuta 3001)

- GET /books
  - Lista livros. Aceita query `q` para busca.
- GET /books/:id
  - Retorna um livro por ID.
- POST /books
  - Cria um livro. Aceita `multipart/form-data` com campo `image` (arquivo) ou corpo JSON com `image` (URL).
  - Campos: `title`, `author`, `publishedAt` (YYYY-MM-DD), `description`, `image` (url) ou `image` via form-data
- PUT /books/:id
  - Atualiza livro. Similar ao POST; envie `image` para substituir a imagem (arquivo) ou `image` como string para definir/limpar.
- DELETE /books/:id
  - Remove um livro.

Exemplo de upload (curl):

```bash
curl -X POST -F "title=Meu Livro" -F "author=Autor" -F "image=@./capa.jpg" http://localhost:3001/books
```

---

## Banco de dados

- O projeto usa MySQL; o script `backend/db/init.sql` cria o banco `booksdb`, tabela `books` e insere alguns exemplos.

---

## Testes

Backend (requer banco disponível conforme variáveis de ambiente):

```bash
cd backend
npm test
```

Frontend:

```bash
cd frontend
npm test
```

---

## Estrutura do projeto

- backend/
  - src/: código do servidor (controllers, services, models)
  - db/init.sql: criação + seed de dados
  - uploads/: imagens enviadas (servidas estaticamente em `/uploads`)
- frontend/
  - src/: React components, pages, serviços

---

## Observações importantes

- Imagens enviadas são salvas em `backend/uploads` e servidas em `/uploads`.
- Ao atualizar uma imagem via PUT, se houver imagem local anterior ela é removida (quando possível).
- O `docker-compose.yml` mapeia a porta MySQL para `3307` no host; quando o backend é executado como container, ele se conecta internamente ao serviço `mysql` (não precisa do mapeamento de host).

---

## Contribuições

Contribuições são bem-vindas! Abra uma issue ou envie um pull request descrevendo a mudança.

---

## Licença

Este projeto utiliza licença **ISC** (conforme `backend/package.json`).

---

## Contato

Se quiser que eu melhore o README (ex.: adicionar badges, guias de deploy, ou tradução para inglês), posso ajustar conforme preferir. ✅
