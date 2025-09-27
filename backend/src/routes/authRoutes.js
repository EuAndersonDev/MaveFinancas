const express = require('express');
const router = express.Router();
const { createUser, login } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', createUser);
router.post('/login', login);

// exemplo rota protegida
router.get('/me', auth, (req, res) => {
    res.json({ userId: req.user.sub, email: req.user.email });
});

module.exports = router;