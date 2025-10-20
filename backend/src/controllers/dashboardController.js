const dashboardModel = require('../models/dashboardModel');

const getDashboard = async (req, res) => {
  try {
    const { date } = req.query;
    // Ajuste a origem do userId conforme sua auth (ex.: JWT, session). Temporário: header.
    const userId = req.user?.id || req.headers['x-user-id'];
    if (!userId) {
      return res.status(400).json({ message: 'userId ausente' });
    }

    const targetDate = date || new Date().toISOString().slice(0, 10);
    const rows = await getDashboardData(userId, targetDate);
    return res.json(rows);
  } catch (err) {
    console.error('Erro /api/dashboard:', err);
    return res.status(500).json({ message: 'Erro ao obter dashboard' });
  }
};

module.exports = { getDashboard };