-- MIGRAÇÃO DO BANCO DE DADOS - Adiciona tabela de categorias
-- Execute este script se você JÁ TEM o banco criado e quer migrar para a nova estrutura

USE apiFinances;

-- 1. Criar tabela de categorias
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

-- 2. Inserir categorias padrão
INSERT INTO category (id, name, type, icon, color) VALUES
    -- Categorias de RECEITA
    ('111e8400-e29b-41d4-a716-446655440001', 'Salário', 'income', '💼', '#39BE00'),
    ('111e8400-e29b-41d4-a716-446655440002', 'Freelance', 'income', '💻', '#4CAF50'),
    ('111e8400-e29b-41d4-a716-446655440003', 'Investimentos', 'income', '📈', '#8BC34A'),
    ('111e8400-e29b-41d4-a716-446655440004', 'Outros Ganhos', 'income', '💰', '#CDDC39'),
    
    -- Categorias de DESPESA
    ('111e8400-e29b-41d4-a716-446655440005', 'Moradia', 'expense', '🏠', '#F44336'),
    ('111e8400-e29b-41d4-a716-446655440006', 'Alimentação', 'expense', '🍔', '#E91E63'),
    ('111e8400-e29b-41d4-a716-446655440007', 'Transporte', 'expense', '🚗', '#9C27B0'),
    ('111e8400-e29b-41d4-a716-446655440008', 'Saúde', 'expense', '🏥', '#673AB7'),
    ('111e8400-e29b-41d4-a716-446655440009', 'Lazer', 'expense', '🎮', '#3F51B5'),
    ('111e8400-e29b-41d4-a716-446655440010', 'Outros Gastos', 'expense', '🛒', '#FF5722');

-- 3. Adicionar coluna category_id na tabela transaction
ALTER TABLE transaction ADD COLUMN category_id CHAR(36) NULL AFTER date;

-- 4. Migrar dados existentes: mapear type para category_id
UPDATE transaction t
SET t.category_id = CASE 
    WHEN t.type = 'deposit' THEN '111e8400-e29b-41d4-a716-446655440004'  -- Outros Ganhos
    WHEN t.type = 'withdrawal' THEN '111e8400-e29b-41d4-a716-446655440010' -- Outros Gastos
    ELSE '111e8400-e29b-41d4-a716-446655440010'
END
WHERE t.category_id IS NULL;

-- 5. Renomear coluna description para name
ALTER TABLE transaction CHANGE COLUMN description name VARCHAR(255) NOT NULL;

-- 6. Ajustar amounts: transformar em valores positivos/negativos baseado no tipo
UPDATE transaction t
INNER JOIN category c ON t.category_id = c.id
SET t.amount = CASE
    WHEN c.type = 'income' AND t.amount < 0 THEN ABS(t.amount)
    WHEN c.type = 'expense' AND t.amount > 0 THEN -t.amount
    ELSE t.amount
END;

-- 7. Tornar category_id obrigatório e adicionar FK
ALTER TABLE transaction MODIFY COLUMN category_id CHAR(36) NOT NULL;
ALTER TABLE transaction ADD CONSTRAINT fk_transaction_category FOREIGN KEY (category_id) REFERENCES category(id);

-- 8. Remover coluna type (não é mais necessária)
ALTER TABLE transaction DROP COLUMN type;

-- 9. Recalcular saldos das contas
UPDATE account a
SET a.balance = (
    SELECT COALESCE(SUM(t.amount), 0)
    FROM transaction t
    WHERE t.account_id = a.id
)
WHERE EXISTS (SELECT 1 FROM transaction WHERE account_id = a.id);

SELECT '✅ Migração concluída com sucesso!' AS status;
SELECT 'Categorias criadas:', COUNT(*) FROM category;
SELECT 'Transações migradas:', COUNT(*) FROM transaction WHERE category_id IS NOT NULL;
