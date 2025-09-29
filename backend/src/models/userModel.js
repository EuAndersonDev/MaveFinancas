const connection = require('../config/db');
const bcrypt = require('bcrypt');

// Valor inicial padrão para a conta criada automaticamente ao registrar um usuário
const DEFAULT_INITIAL_BALANCE = 0.00;

const createUser = async (user) => {
    const { name, email, password } = user;
    const hash = await bcrypt.hash(password, 10);

    // Usar uma conexão dedicada para suportar transação
    const conn = await connection.getConnection();
    try {
        await conn.beginTransaction();

        // 1. Criar usuário
        const userQuery = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
        const [userResult] = await conn.execute(userQuery, [name || null, email || null, hash || null]);
        const userId = userResult.insertId;

        // 2. Criar conta vinculada
        const accountQuery = "INSERT INTO account (balance, user_id) VALUES (?, ?)";
        const [accountResult] = await conn.execute(accountQuery, [DEFAULT_INITIAL_BALANCE, userId]);
        const accountId = accountResult.insertId;

        await conn.commit();

        return {
            id: userId,
            name,
            email,
            account: {
                id: accountId,
                balance: DEFAULT_INITIAL_BALANCE
            }
        };
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
};

const findByEmail = async (email) => {
    const query = "SELECT * FROM user WHERE email = ?";
    const [result] = await connection.execute(query, [email]);
    return result[0] || null;
};

module.exports = {
    createUser,
    findByEmail
};
