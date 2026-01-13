# 📚 Books-Apps

Aplicação full stack para gerenciamento de livros, desenvolvida como parte de um processo seletivo técnico.

O projeto é dividido em **Front-end (React)** e **Back-end (Node.js)**, com **API REST**, **banco de dados** e **conteinerização com Docker e Docker Compose**.

---

## 🚀 Tecnologias Utilizadas

### Front-end

* React
* JavaScript
* Axios
* CSS / Tailwind 

### Back-end

* Node.js
* Express
* API REST
* Banco de dados relacional Mysql
* Docker
* Docker Compose

---

## ⚙️ Configuração do Ambiente

## ⚙️ Pré-requisitos

Para executar o projeto localmente, é necessário ter instalado:

- Docker
- Docker Compose
- Node.js (apenas para rodar o front-end em modo desenvolvimento)

---

## 🐳 Executando o Projeto com Docker (Back-end)

Na **raiz do projeto** (`books-app`), execute:

```bash
docker-compose up --build
```

Esse comando irá:

* Subir a API Node.js

* Subir o banco de dados MySQL

* Configurar automaticamente a comunicação entre API e banco

* Expor a API para consumo do front-end

Após a inicialização, a API estará disponível em:

```bash
http://localhost:3001
```
▶️ Executando o Front-end (React)

Em outro terminal, acesse a pasta do front-end:

```bash
cd books-app/frontend
```

Instale as dependências:

```bash
npm install
```

Inicie a aplicação:

```bash
npm start
```

A aplicação estará disponível em: 

```bash
http://localhost:3000
```

📌 Observação:
O back-end deve estar em execução antes de iniciar o front-end.

---

## 📌 Funcionalidades

* Listagem de livros
* Cadastro de novos livros
* Edição de livros existentes
* Exclusão de livros
* Comunicação completa entre Front-end e API REST

---

## 🖼️ Upload de Imagens

As capas dos livros são armazenadas via Upload local

Funcionamento

* O banco de dados já possui 3 livros de exemplo cadastrados com URLs externas de imagens.

* Ao criar um novo livro, o usuário pode selecionar uma imagem local.

* Essa imagem é enviada para o backend via upload, armazenada na pasta uploads/ e exposta publicamente pela API.

Exemplo:

* URL local:

```bash
http://localhost:3001/uploads/nome-da-imagem.jpg
```
Essa abordagem foi escolhida por ser simples, escalável e adequada para ambientes de teste técnico.

---

🔌 Principais Rotas da API

* GET /books — lista todos os livros

* GET /books/:id — retorna um livro específico

* POST /books — cria um novo livro

* PUT /books/:id — atualiza um livro existente

* DELETE /books/:id — remove um livro

---

## 🧪 Testes

O back-end possui testes automatizados para os principais fluxos do CRUD de livros, garantindo:

* Criação
* Leitura
* Atualização
* Remoção

Para executar os testes:

```bash
npm test
```
---

## 📄 Observações Importantes

* O front-end e o back-end são **aplicações independentes**
* A comunicação é feita exclusivamente via API REST
* O projeto simula um ambiente real de desenvolvimento profissional
* Estrutura pensada para facilitar manutenção, testes e evolução

---

## 👨‍💻 Autor

Projeto desenvolvido por **Renato Santos**

