const connection = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const getAllCategories = async () => {
    const query = `
        SELECT id, name, type, icon, color, created_at, updated_at
        FROM category
        ORDER BY type, name
    `;
    const [categories] = await connection.execute(query);
    return categories;
};

const getCategoryById = async (id) => {
    const query = `
        SELECT id, name, type, icon, color, created_at, updated_at
        FROM category
        WHERE id = ?
    `;
    const [category] = await connection.execute(query, [id]);
    return category[0];
};

const getCategoriesByType = async (type) => {
    const query = `
        SELECT id, name, type, icon, color, created_at, updated_at
        FROM category
        WHERE type = ?
        ORDER BY name
    `;
    const [categories] = await connection.execute(query, [type]);
    return categories;
};

const createCategory = async (category) => {
    const { name, type, icon, color } = category;
    const id = uuidv4();
    const query = `
        INSERT INTO category (id, name, type, icon, color)
        VALUES (?, ?, ?, ?, ?)
    `;
    await connection.execute(query, [id, name, type, icon || null, color || null]);
    return { id, name, type, icon, color };
};

const updateCategory = async (id, category) => {
    const { name, type, icon, color } = category;
    const query = `
        UPDATE category
        SET name = ?, type = ?, icon = ?, color = ?
        WHERE id = ?
    `;
    const [result] = await connection.execute(query, [name, type, icon || null, color || null, id]);
    return result;
};

const deleteCategory = async (id) => {
    // Verifica se há transações usando esta categoria
    const [transactions] = await connection.execute(
        'SELECT COUNT(*) as count FROM transaction WHERE category_id = ?',
        [id]
    );
    
    if (transactions[0].count > 0) {
        throw new Error('Não é possível deletar categoria com transações associadas');
    }

    const query = 'DELETE FROM category WHERE id = ?';
    const [result] = await connection.execute(query, [id]);
    return result;
};

module.exports = {
    getAllCategories,
    getCategoryById,
    getCategoriesByType,
    createCategory,
    updateCategory,
    deleteCategory
};
