const dashboardModel = require('../models/dashboardModel');

const getDashboard = async (req, res) => {
    const { date } = req.query;

    if (!date) {
        return res.status(400).json({ message: 'Date query parameter is required' });
    }

    try {
        const dashboardData = await dashboardModel.getDashboardData(date);
        res.status(200).json(dashboardData);
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getDashboard };