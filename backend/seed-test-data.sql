-- Script para criar usuário de teste e transações de exemplo
USE apiFinances;

-- Limpar dados existentes de teste (opcional)
DELETE FROM transaction WHERE user_id = '550e8400-e29b-41d4-a716-446655440000';
DELETE FROM account WHERE user_id = '550e8400-e29b-41d4-a716-446655440000';
DELETE FROM user WHERE email = 'teste@mave.com';
DELETE FROM category WHERE id IN (
    '111e8400-e29b-41d4-a716-446655440001',
    '111e8400-e29b-41d4-a716-446655440002',
    '111e8400-e29b-41d4-a716-446655440003',
    '111e8400-e29b-41d4-a716-446655440004',
    '111e8400-e29b-41d4-a716-446655440005',
    '111e8400-e29b-41d4-a716-446655440006',
    '111e8400-e29b-41d4-a716-446655440007',
    '111e8400-e29b-41d4-a716-446655440008',
    '111e8400-e29b-41d4-a716-446655440009',
    '111e8400-e29b-41d4-a716-446655440010'
);

-- Inserir categorias padrão
INSERT INTO category (id, name, type, icon, color) VALUES
    ('111e8400-e29b-41d4-a716-446655440001', 'Salário', 'income', '💼', '#39BE00'),
    ('111e8400-e29b-41d4-a716-446655440002', 'Freelance', 'income', '💻', '#4CAF50'),
    ('111e8400-e29b-41d4-a716-446655440003', 'Investimentos', 'income', '📈', '#8BC34A'),
    ('111e8400-e29b-41d4-a716-446655440004', 'Outros Ganhos', 'income', '💰', '#CDDC39'),
    ('111e8400-e29b-41d4-a716-446655440005', 'Moradia', 'expense', '🏠', '#F44336'),
    ('111e8400-e29b-41d4-a716-446655440006', 'Alimentação', 'expense', '🍔', '#E91E63'),
    ('111e8400-e29b-41d4-a716-446655440007', 'Transporte', 'expense', '🚗', '#9C27B0'),
    ('111e8400-e29b-41d4-a716-446655440008', 'Saúde', 'expense', '🏥', '#673AB7'),
    ('111e8400-e29b-41d4-a716-446655440009', 'Lazer', 'expense', '🎮', '#3F51B5'),
    ('111e8400-e29b-41d4-a716-446655440010', 'Outros Gastos', 'expense', '🛒', '#FF5722');

    -- Categorias de DESPESA

-- Inserir usuário teste
-- Senha: teste123 (hash bcrypt gerado com salt 10)
INSERT INTO user (id, name, email, password, created_at, updated_at)
VALUES (
    '550e8400-e29b-41d4-a716-446655440000',
    'Usuário Teste',
    'teste@mave.com',
    '$2b$10$cxE9BRXGqkpp1Rb5tE73BeZRCOZRxi2eE7FRWJFkqiRXJGRE6KAYO',
    NOW(),
    NOW()
);

-- Inserir conta para o usuário teste
INSERT INTO account (id, balance, user_id, created_at, updated_at)
VALUES (
    '650e8400-e29b-41d4-a716-446655440001',
    0.00,
    '550e8400-e29b-41d4-a716-446655440000',
    NOW(),
    NOW()
);

-- Inserir transações de exemplo para novembro de 2025
-- Receitas (categoria_id das categorias de income)
INSERT INTO transaction (id, name, amount, date, category_id, user_id, account_id, created_at, updated_at)
VALUES 
    (UUID(), 'Salário Mensal', 6000.00, '2025-11-01', '111e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Freelance - Design de Logo', 2500.00, '2025-11-05', '111e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Consultoria TI', 1800.00, '2025-11-08', '111e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Pix recebido', 450.00, '2025-11-12', '111e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Reembolso', 189.45, '2025-11-15', '111e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW());

-- Despesas - Moradia
INSERT INTO transaction (id, name, amount, date, category_id, user_id, account_id, created_at, updated_at)
VALUES 
    (UUID(), 'Aluguel', -1500.00, '2025-11-05', '111e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Conta de luz', -235.80, '2025-11-07', '111e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Conta de água', -98.50, '2025-11-07', '111e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Internet + TV', -150.00, '2025-11-08', '111e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Condomínio', -280.00, '2025-11-10', '111e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW());

-- Despesas - Alimentação
INSERT INTO transaction (id, name, amount, date, category_id, user_id, account_id, created_at, updated_at)
VALUES 
    (UUID(), 'Supermercado - Compra mensal', -850.00, '2025-11-03', '111e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Feira', -180.50, '2025-11-06', '111e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Restaurante', -145.90, '2025-11-09', '111e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Padaria', -85.30, '2025-11-11', '111e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'iFood', -68.90, '2025-11-13', '111e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Açougue', -120.00, '2025-11-14', '111e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW());

-- Despesas - Transporte
INSERT INTO transaction (id, name, amount, date, category_id, user_id, account_id, created_at, updated_at)
VALUES 
    (UUID(), 'Gasolina', -280.00, '2025-11-04', '111e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Uber', -52.40, '2025-11-06', '111e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Estacionamento', -25.00, '2025-11-09', '111e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Metrô e ônibus', -38.00, '2025-11-12', '111e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Manutenção carro', -450.00, '2025-11-14', '111e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW());

-- Despesas - Saúde
INSERT INTO transaction (id, name, amount, date, category_id, user_id, account_id, created_at, updated_at)
VALUES 
    (UUID(), 'Plano de saúde', -420.00, '2025-11-05', '111e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Farmácia', -156.80, '2025-11-10', '111e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Consulta médica', -250.00, '2025-11-13', '111e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Exames', -180.00, '2025-11-16', '111e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW());

-- Despesas - Lazer
INSERT INTO transaction (id, name, amount, date, category_id, user_id, account_id, created_at, updated_at)
VALUES 
    (UUID(), 'Cinema', -62.00, '2025-11-02', '111e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Netflix', -55.90, '2025-11-07', '111e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Spotify', -21.90, '2025-11-07', '111e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Bar com amigos', -128.50, '2025-11-09', '111e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Livros', -89.90, '2025-11-11', '111e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Academia', -120.00, '2025-11-15', '111e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW());

-- Atualizar o saldo da conta baseado nas transações
UPDATE account 
SET balance = (
    SELECT SUM(amount)
    FROM transaction
    WHERE user_id = '550e8400-e29b-41d4-a716-446655440000'
)
WHERE id = '650e8400-e29b-41d4-a716-446655440001';

-- Verificar saldo total das transações
SELECT 
    'Resumo de Transações' AS descricao,
    SUM(CASE WHEN c.type = 'income' THEN t.amount ELSE 0 END) AS total_receitas,
    ABS(SUM(CASE WHEN c.type = 'expense' THEN t.amount ELSE 0 END)) AS total_despesas,
    SUM(t.amount) AS saldo_liquido
FROM transaction t
INNER JOIN category c ON t.category_id = c.id
WHERE t.user_id = '550e8400-e29b-41d4-a716-446655440000';

-- Exibir dados finais
SELECT * FROM user WHERE email = 'teste@mave.com';
SELECT * FROM account WHERE user_id = '550e8400-e29b-41d4-a716-446655440000';
SELECT COUNT(*) AS total_transacoes FROM transaction WHERE user_id = '550e8400-e29b-41d4-a716-446655440000';

-- Exibir categorias cadastradas
SELECT * FROM category ORDER BY type, name;

-- ====================================
-- INFORMAÇÕES PARA LOGIN
-- ====================================
-- Email: teste@mave.com
-- Senha: teste123
-- User ID: 550e8400-e29b-41d4-a716-446655440000
-- Account ID: 650e8400-e29b-41d4-a716-446655440001

-- Inserir conta para o usuário teste
INSERT INTO account (id, balance, user_id, created_at, updated_at)
VALUES (
    '650e8400-e29b-41d4-a716-446655440001',
    5840.55,
    '550e8400-e29b-41d4-a716-446655440000',
    NOW(),
    NOW()
);

-- Inserir transações de exemplo para novembro de 2025
-- Receitas
INSERT INTO transaction (id, description, amount, date, type, user_id, account_id, created_at, updated_at)
VALUES 
    (UUID(), 'Salário', 6000.00, '2025-11-01', 'deposit', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Freelance - Design', 2500.00, '2025-11-05', 'deposit', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Consultoria', 1800.00, '2025-11-08', 'deposit', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Pix recebido', 450.00, '2025-11-12', 'deposit', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Reembolso', 189.45, '2025-11-15', 'deposit', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW());

-- Despesas - Moradia
INSERT INTO transaction (id, description, amount, date, type, user_id, account_id, created_at, updated_at)
VALUES 
    (UUID(), 'Aluguel', 1500.00, '2025-11-05', 'withdrawal', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Conta de luz', 235.80, '2025-11-07', 'withdrawal', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Conta de água', 98.50, '2025-11-07', 'withdrawal', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Internet + TV', 150.00, '2025-11-08', 'withdrawal', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Condomínio', 280.00, '2025-11-10', 'withdrawal', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW());

-- Despesas - Alimentação
INSERT INTO transaction (id, description, amount, date, type, user_id, account_id, created_at, updated_at)
VALUES 
    (UUID(), 'Supermercado - Compra mensal', 850.00, '2025-11-03', 'withdrawal', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Feira', 180.50, '2025-11-06', 'withdrawal', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Restaurante', 145.90, '2025-11-09', 'withdrawal', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Padaria', 85.30, '2025-11-11', 'withdrawal', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'iFood', 68.90, '2025-11-13', 'withdrawal', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Açougue', 120.00, '2025-11-14', 'withdrawal', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW());

-- Despesas - Transporte
INSERT INTO transaction (id, description, amount, date, type, user_id, account_id, created_at, updated_at)
VALUES 
    (UUID(), 'Gasolina', 280.00, '2025-11-04', 'withdrawal', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Uber', 52.40, '2025-11-06', 'withdrawal', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Estacionamento', 25.00, '2025-11-09', 'withdrawal', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Metrô e ônibus', 38.00, '2025-11-12', 'withdrawal', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Manutenção carro', 450.00, '2025-11-14', 'withdrawal', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW());

-- Despesas - Saúde
INSERT INTO transaction (id, description, amount, date, type, user_id, account_id, created_at, updated_at)
VALUES 
    (UUID(), 'Plano de saúde', 420.00, '2025-11-05', 'withdrawal', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Farmácia', 156.80, '2025-11-10', 'withdrawal', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Consulta médica', 250.00, '2025-11-13', 'withdrawal', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Exames', 180.00, '2025-11-16', 'withdrawal', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW());

-- Despesas - Lazer
INSERT INTO transaction (id, description, amount, date, type, user_id, account_id, created_at, updated_at)
VALUES 
    (UUID(), 'Cinema', 62.00, '2025-11-02', 'withdrawal', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Netflix', 55.90, '2025-11-07', 'withdrawal', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Spotify', 21.90, '2025-11-07', 'withdrawal', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Bar com amigos', 128.50, '2025-11-09', 'withdrawal', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Livros', 89.90, '2025-11-11', 'withdrawal', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
    (UUID(), 'Academia', 120.00, '2025-11-15', 'withdrawal', '550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001', NOW(), NOW());

-- Verificar saldo total das transações
SELECT 
    'Resumo de Transações' AS descricao,
    SUM(CASE WHEN type = 'deposit' THEN amount ELSE 0 END) AS total_receitas,
    SUM(CASE WHEN type = 'withdrawal' THEN amount ELSE 0 END) AS total_despesas,
    SUM(CASE WHEN type = 'deposit' THEN amount ELSE -amount END) AS saldo_liquido
FROM transaction
WHERE user_id = '550e8400-e29b-41d4-a716-446655440000';

-- Atualizar o saldo da conta baseado nas transações
UPDATE account 
SET balance = (
    SELECT SUM(CASE WHEN type = 'deposit' THEN amount ELSE -amount END)
    FROM transaction
    WHERE user_id = '550e8400-e29b-41d4-a716-446655440000'
)
WHERE id = '650e8400-e29b-41d4-a716-446655440001';

-- Exibir dados finais
SELECT * FROM user WHERE email = 'teste@mave.com';
SELECT * FROM account WHERE user_id = '550e8400-e29b-41d4-a716-446655440000';
SELECT COUNT(*) AS total_transacoes FROM transaction WHERE user_id = '550e8400-e29b-41d4-a716-446655440000';

-- ====================================
-- INFORMAÇÕES PARA LOGIN
-- ====================================
-- Email: teste@mave.com
-- Senha: teste123
-- User ID: 550e8400-e29b-41d4-a716-446655440000
-- Account ID: 650e8400-e29b-41d4-a716-446655440001
