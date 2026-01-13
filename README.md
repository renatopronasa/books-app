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

### Pré-requisitos

* Docker
* Docker Compose
* Node.js
* Multer (upload de arquivos)
* Arquitetura MVC (Controller / Service / Repository)

---

## 🐳 Executando o Projeto com Docker

Na raiz do projeto (`books-app/backend`), execute:

```bash
docker-compose up --build
```

Isso irá:

* Subir a API Node.js
* Subir o banco de dados
* Expor a API para consumo do front-end

A API estará disponível em: http://localhost:3001

- Para instalar as dependencias, na raiz do projeto (`books-app/frontend`), execute:

```bash
npm install 
```

- Para rodar a aplicação

```bash
npm start - para rodar a aplicação
```

A aplicação estará disponível em: http://localhost:3000

---

## 📌 Funcionalidades

* Listar livros
* Cadastrar novo livro
* Editar livro existente
* Excluir livro
* Comunicação completa entre Front-end e API REST

---

## 🖼️ Upload de Imagens

As capas dos livros são armazenadas via **URL** (local ou externa).

Exemplo:

* URL local:
  `http://localhost:3001/uploads/nome-da-imagem.jpg`
* URL externa:
  `https://images-na.ssl-images-amazon.com/...`

Essa abordagem foi escolhida por ser simples, escalável e adequada para ambientes de teste técnico.

---

## 🧪 Testes

O back-end possui testes automatizados para os principais fluxos do CRUD de livros, garantindo:

* Criação
* Leitura
* Atualização
* Remoção

---

## 📄 Observações Importantes

* O front-end e o back-end são **aplicações independentes**
* A comunicação é feita exclusivamente via API REST
* O projeto simula um ambiente real de desenvolvimento profissional
* Estrutura pensada para fácil manutenção e evolução

---

## 👨‍💻 Autor

Projeto desenvolvido por **Renato Santos**
