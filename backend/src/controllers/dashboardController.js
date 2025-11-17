const dashboardModel = require('../models/dashboardModel');

const getDashboard = async (req, res) => {
  try {
    const { date } = req.query;
    const userId = req.user?.id || req.headers['x-user-id'];
    if (!userId) {
      return res.status(400).json({ message: 'userId ausente' });
    }

    const targetDate = date || new Date().toISOString().slice(0, 10);
    const data = await dashboardModel.getDashboardData(userId, targetDate);
    return res.json(data);
  } catch (err) {
    console.error('Erro /dashboard:', err);
    return res.status(500).json({ message: 'Erro ao obter dashboard' });
  }
};

module.exports = { getDashboard };