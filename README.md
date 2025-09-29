# 💰 API de Finanças Pessoais

Sistema para **gerenciamento de contas, transações e relatórios financeiros**, com autenticação segura via **JWT**.

Frontend: **Next.js**  
Backend: **nodeJS** + **mySQL** + **Postman** 
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
* id, name, email (UNIQUE), password, created_at

**Account**  
* id, user_id, name, balance, created_at

**Transaction**  
* id, account_id, type (INCOME/EXPENSE), amount, description, date, created_at

**Category** *(opcional)*  
* id, name, type (INCOME/EXPENSE)

---

## 📅 Planejamento por Sprints

### 🟢 Sprint 1 — Planejamento (até 22/09/2025)
* Definir tema e backlog.
* Criar protótipos no Figma.
* Organizar tarefas no Trello.

### 🟡 Sprint 2 — Desenvolvimento (22/09 → 13/09/2025)
* Implementar backend (nodeJS + POSTMAN + JWT + Swagger).
* Implementar frontend (Next.js).
* Funcionalidades principais: autenticação, contas, transações e extrato.

### 🔵 Sprint 3 — Testes & Documentação (01/10 → 27/10/2025)
* Testes unitários (Jest).
* Testes de API (Postman).
* Testes de caixa preta (Selenium IDE).
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

### 🔧 Pré-requisitos
- [Docker](https://docs.docker.com/get-docker/)  
- [Docker Compose](https://docs.docker.com/compose/)  

---

### 🐳 Rodando com Docker

1. **Clonar repositório**
   ```bash
   git clone https://github.com/seu-repo/api-financas.git
   cd api-financas
