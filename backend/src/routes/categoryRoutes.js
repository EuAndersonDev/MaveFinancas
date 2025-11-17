const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// GET /categories - Lista todas as categorias
router.get('/', categoryController.getAllCategories);

// GET /categories/type/:type - Lista categorias por tipo (income ou expense)
router.get('/type/:type', categoryController.getCategoriesByType);

// GET /categories/:id - Busca categoria por ID
router.get('/:id', categoryController.getCategoryById);

// POST /categories - Cria nova categoria
router.post('/', categoryController.createCategory);

// PUT /categories/:id - Atualiza categoria
router.put('/:id', categoryController.updateCategory);

// DELETE /categories/:id - Deleta categoria
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
