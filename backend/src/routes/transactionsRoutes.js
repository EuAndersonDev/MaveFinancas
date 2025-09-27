const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Transactions CRUD
router.post('/', transactionController.addTransaction);          // POST /transactions
router.get('/', transactionController.getAllTransactions);       // GET /transactions
router.get('/:id', transactionController.getTransactionById);    // GET /transactions/:id
router.put('/:id', transactionController.updateTransaction);     // PUT /transactions/:id
router.delete('/:id', transactionController.deleteTransaction);  // DELETE /transactions/:id

module.exports = router;
