const connection = require('../config/db');

const getDashboardData = async (userId, date) => {
    const query = `
        SELECT 
            a.id,
            a.balance AS saldo,
            COALESCE(SUM(CASE WHEN t.type = 'deposit' THEN t.amount ELSE 0 END), 0) AS valor_investido,
            COUNT(t.id) AS total_transacoes,
            COALESCE((
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'categoria', tt.type,
                        'quantidade', COUNT(*),
                        'valor_total', SUM(tt.amount)
                    )
                )
                FROM transaction tt
                WHERE tt.account_id = a.id
                  AND DATE(tt.date) = DATE(?)
                GROUP BY tt.account_id
            ), JSON_ARRAY()) AS transacoes_por_categoria
        FROM account a
        LEFT JOIN transaction t 
            ON t.account_id = a.id
           AND DATE(t.date) = DATE(?)
        WHERE a.user_id = ?
        GROUP BY a.id, a.balance;
    `;

    const [rows] = await connection.execute(query, [date, date, userId]);
    return rows;
};

module.exports = { getDashboardData };