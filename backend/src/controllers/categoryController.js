const categoryModel = require('../models/categoryModel');

const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.getAllCategories();
        return res.json(categories);
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        return res.status(500).json({ error: 'Erro ao buscar categorias' });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryModel.getCategoryById(id);
        if (!category) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }
        return res.json(category);
    } catch (error) {
        console.error('Erro ao buscar categoria:', error);
        return res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
};

const getCategoriesByType = async (req, res) => {
    try {
        const { type } = req.params;
        if (!['income', 'expense'].includes(type)) {
            return res.status(400).json({ error: 'Tipo inválido. Use "income" ou "expense"' });
        }
        const categories = await categoryModel.getCategoriesByType(type);
        return res.json(categories);
    } catch (error) {
        console.error('Erro ao buscar categorias por tipo:', error);
        return res.status(500).json({ error: 'Erro ao buscar categorias' });
    }
};

const createCategory = async (req, res) => {
    try {
        const { name, type, icon, color } = req.body;
        
        if (!name || !type) {
            return res.status(400).json({ error: 'Nome e tipo são obrigatórios' });
        }
        
        if (!['income', 'expense'].includes(type)) {
            return res.status(400).json({ error: 'Tipo inválido. Use "income" ou "expense"' });
        }

        const category = await categoryModel.createCategory({ name, type, icon, color });
        return res.status(201).json(category);
    } catch (error) {
        console.error('Erro ao criar categoria:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Categoria com este nome e tipo já existe' });
        }
        return res.status(500).json({ error: 'Erro ao criar categoria' });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type, icon, color } = req.body;

        if (!name || !type) {
            return res.status(400).json({ error: 'Nome e tipo são obrigatórios' });
        }

        if (!['income', 'expense'].includes(type)) {
            return res.status(400).json({ error: 'Tipo inválido. Use "income" ou "expense"' });
        }

        await categoryModel.updateCategory(id, { name, type, icon, color });
        return res.json({ message: 'Categoria atualizada com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar categoria:', error);
        return res.status(500).json({ error: 'Erro ao atualizar categoria' });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.deleteCategory(id);
        return res.json({ message: 'Categoria deletada com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar categoria:', error);
        if (error.message.includes('transações associadas')) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Erro ao deletar categoria' });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    getCategoriesByType,
    createCategory,
    updateCategory,
    deleteCategory
};
