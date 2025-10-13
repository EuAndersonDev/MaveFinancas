const connection = require('../config/db');

const getDashboardData = async (userId, date) => {
    const query = `
        SELECT 
            a.balance AS saldo,
            SUM(CASE WHEN t.type = 'deposit' THEN t.amount ELSE 0 END) AS valor_investido,
            COUNT(t.id) AS total_transacoes,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'categoria', t.type,
                    'quantidade', COUNT(t.id),
                    'valor_total', SUM(t.amount)
                )
            ) AS transacoes_por_categoria
        FROM account a
        LEFT JOIN transaction t ON a.id = t.account_id
        WHERE a.user_id = ? AND t.date = ?
        GROUP BY a.id;
    `;

    const [rows] = await connection.execute(query, [userId, date]);
    return rows;
};

module.exports = { getDashboardData };