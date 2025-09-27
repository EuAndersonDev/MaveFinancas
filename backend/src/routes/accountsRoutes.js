const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Accounts
router.post('/', accountController.createAccount);          // POST /accounts
router.get('/:id', accountController.getAccountById);       // GET /accounts/:id
router.get('/:id/balance', accountController.balance);      // GET /accounts/:id/balance

module.exports = router;
