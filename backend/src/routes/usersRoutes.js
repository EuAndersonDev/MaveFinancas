const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Users
router.post('/', userController.createUser); // POST /users

module.exports = router;
