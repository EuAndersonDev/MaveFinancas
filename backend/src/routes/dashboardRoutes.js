const express = require('express');
const router = express.Router();

// GET /dashboard (ou o path em que for montado no app.js)
router.get('/', (req, res) => {
  res.json({ ok: true, message: 'Dashboard route up' });
});

// Adicione outras rotas aqui conforme necessário
module.exports = router;