# 💰 API de Finanças Pessoais

Sistema para **gerenciamento de contas, transações e relatórios financeiros**, com autenticação segura via **JWT**.

Frontend: **Next.js**
Backend: **Spring Boot** + **PostgreSQL**
Documentação: **Swagger**

---

## 📌 Funcionalidades Principais

* 🔐 **Autenticação e Segurança**

  * Registro e login de usuários com JWT.
  * Proteção de rotas e dados por usuário.

* 🏦 **Gestão de Contas**

  * Criar, listar, editar e excluir contas.
  * Saldo atualizado automaticamente.

* 💸 **Lançamento de Transações**

  * Registrar receitas e despesas.
  * Atualização automática do saldo.

* 📊 **Extrato e Relatórios**

  * Extrato filtrado por data, tipo, conta e categoria.
  * Relatórios de saldo consolidado.

* 🏷️ **Categorias (Opcional)**

  * Classificação de receitas e despesas.
  * Preparado para relatórios avançados.

---

## 🗂️ Modelo de Dados

**User**

* id, name, email, password, created\_at

**Account**

* id, user\_id, name, balance, created\_at

**Transaction**

* id, account\_id, type (INCOME/EXPENSE), amount, description, date, created\_at

**Category** *(opcional)*

* id, name, type (INCOME/EXPENSE)

---

## 📅 Planejamento por Sprints

### 🟢 Sprint 1 — Planejamento (até 25/08/2025)

* Definir tema e backlog.
* Criar protótipos no Figma.
* Organizar tarefas no Trello.

### 🟡 Sprint 2 — Desenvolvimento (26/08 → 30/09/2025)

* Implementar backend (Spring Boot + JWT + Swagger).
* Implementar frontend (Next.js).
* Funcionalidades principais: autenticação, contas, transações e extrato.

### 🔵 Sprint 3 — Testes & Documentação (01/10 → 27/10/2025)

* Testes unitários (JUnit, Jest).
* Testes de API (Postman).
* Testes funcionais (Selenium IDE).
* Documentação final no Swagger.

---

## 🔑 Endpoints Principais

### Autenticação

* `POST /auth/register` → Criar usuário.
* `POST /auth/login` → Autenticar e gerar token.
* `GET /auth/me` → Dados do usuário logado.

### Contas

* `POST /accounts` → Criar conta.
* `GET /accounts` → Listar contas.
* `GET /accounts/{id}` → Detalhar conta.
* `PUT /accounts/{id}` → Atualizar conta.
* `DELETE /accounts/{id}` → Excluir conta.

### Transações

* `POST /transactions` → Criar transação.
* `GET /transactions` → Listar transações (com filtros).
* `GET /transactions/{id}` → Detalhar transação.
* `PUT /transactions/{id}` → Editar transação.
* `DELETE /transactions/{id}` → Excluir transação.

### Relatórios

* `GET /reports/balance` → Saldo por conta.
* `GET /reports/summary` → Total receitas/despesas por período.

---

## 🛠️ Tecnologias

* **Backend**: Spring Boot, Spring Security (JWT), JPA/Hibernate
* **Banco de Dados**: PostgreSQL
* **Frontend**: Next.js, React, Tailwind
* **Documentação**: Swagger
* **Testes**: JUnit, Jest, Postman, Selenium

---

## 🚀 Como Executar

### Backend

```bash
# Clonar repositório
git clone https://github.com/seu-repo/api-financas.git
cd api-financas

# Configurar application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/financas
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha

# Rodar aplicação
mvn spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```


