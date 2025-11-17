const connection = require('../config/db');

const getDashboardData = async (userId, targetDate) => {
    // Pega primeiro dia do mês
    const year = targetDate.slice(0, 4);
    const month = targetDate.slice(5, 7);
    const startDate = `${year}-${month}-01`;
    const endDate = targetDate;

    // 1. Busca conta e saldo atual
    const [accounts] = await connection.execute(
        'SELECT id, balance FROM account WHERE user_id = ? LIMIT 1',
        [userId]
    );
    if (accounts.length === 0) {
        return { 
            balance: 0, 
            kpis: { 
                invested: 0, 
                income: { value: 0, trend: '+0%' }, 
                expenses: { value: 0, trend: '+0%' } 
            }, 
            distribution: [], 
            categories: [], 
            transactions: [] 
        };
    }
    const account = accounts[0];

    // 2. KPIs do mês: receitas e despesas com JOIN em category
    const [kpiRows] = await connection.execute(
        `SELECT 
            COALESCE(SUM(CASE WHEN c.type = 'income' THEN t.amount ELSE 0 END), 0) AS income,
            COALESCE(ABS(SUM(CASE WHEN c.type = 'expense' THEN t.amount ELSE 0 END)), 0) AS expenses
         FROM transaction t
         INNER JOIN category c ON t.category_id = c.id
         WHERE t.user_id = ? AND t.date >= ? AND t.date <= ?`,
        [userId, startDate, endDate]
    );
    const kpi = kpiRows[0] || { income: 0, expenses: 0 };

    // 3. Transações recentes (últimas 20) com nome da categoria
    const [txRows] = await connection.execute(
        `SELECT t.id, t.name, t.amount, t.date, c.name as category_name, c.type as category_type, c.icon, c.color
         FROM transaction t
         INNER JOIN category c ON t.category_id = c.id
         WHERE t.user_id = ?
         ORDER BY t.date DESC, t.created_at DESC
         LIMIT 20`,
        [userId]
    );

    const transactions = txRows.map(t => ({
        id: t.id,
        date: new Date(t.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        name: t.name,
        category: t.category_name,
        amount: parseFloat(t.amount),
        icon: t.icon,
        color: t.color
    }));

    // 4. Distribuição (simplificado por tipo)
    const totalIncome = parseFloat(kpi.income);
    const totalExpenses = parseFloat(kpi.expenses);
    const total = totalIncome + totalExpenses || 1;
    const distribution = [
        { label: 'Ganhos', value: Math.round((totalIncome / total) * 100), color: '#39BE00', icon: '/16_Trending Up.svg' },
        { label: 'Gastos', value: Math.round((totalExpenses / total) * 100), color: '#E93030', icon: '/16_Trending Down.svg' },
        { label: 'Investimentos', value: 0, color: '#FFFFFF', icon: '/16_Piggy Bank.svg' }
    ];

    // 5. Categorias de despesas (top 5)
    const [categoryRows] = await connection.execute(
        `SELECT c.name, c.icon, c.color, ABS(SUM(t.amount)) as total
         FROM transaction t
         INNER JOIN category c ON t.category_id = c.id
         WHERE t.user_id = ? AND c.type = 'expense' AND t.date >= ? AND t.date <= ?
         GROUP BY c.id, c.name, c.icon, c.color
         ORDER BY total DESC
         LIMIT 5`,
        [userId, startDate, endDate]
    );

    const categories = categoryRows.map(cat => {
        const catTotal = parseFloat(cat.total);
        const percent = totalExpenses > 0 ? Math.round((catTotal / totalExpenses) * 100) : 0;
        return {
            name: cat.name,
            percent,
            value: `R$ ${catTotal.toFixed(2)}`,
            icon: cat.icon,
            color: cat.color
        };
    });

    return {
        balance: parseFloat(account.balance),
        kpis: {
            invested: 0, // Pode implementar lógica específica
            income: { value: totalIncome, trend: '+0%' },
            expenses: { value: totalExpenses, trend: '+0%' }
        },
        distribution,
        categories,
        transactions
    };
};

module.exports = { getDashboardData };