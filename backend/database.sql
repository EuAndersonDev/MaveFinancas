CREATE DATABASE IF NOT EXISTS apiFinances;
USE apiFinances;

-- Tabelas com UUID (CHAR(36)) como chaves primárias
CREATE TABLE IF NOT EXISTS user (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT uq_user_email UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS account (
    id CHAR(36) PRIMARY KEY,
    balance DECIMAL(19,2) NOT NULL,
    user_id CHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_account_user FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Tabela de categorias
CREATE TABLE IF NOT EXISTS category (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type ENUM('income', 'expense') NOT NULL,
    icon VARCHAR(255) NULL,
    color VARCHAR(7) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT uq_category_name_type UNIQUE (name, type)
);

CREATE TABLE IF NOT EXISTS transaction (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amount DECIMAL(19,2) NOT NULL,
    date DATE NOT NULL,
    category_id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    account_id CHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_transaction_user FOREIGN KEY (user_id) REFERENCES user(id),
    CONSTRAINT fk_transaction_account FOREIGN KEY (account_id) REFERENCES account(id),
    CONSTRAINT fk_transaction_category FOREIGN KEY (category_id) REFERENCES category(id)
);

-- Seed de exemplo usando UUID() do MySQL
-- Primeiro insira o usuário
INSERT INTO user (id, name, email, password) VALUES (UUID(), 'Test User', 'testuser@example.com', 'password123');

-- Depois insira a conta usando o id do usuário inserido
SET @user_id := (SELECT id FROM user WHERE email = 'testuser@example.com' LIMIT 1);
INSERT INTO account (id, balance, user_id) VALUES (UUID(), 1000.00, @user_id);

SELECT * FROM user;