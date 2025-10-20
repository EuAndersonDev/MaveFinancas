const connection = require('../config/db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

// Valor inicial padrão para a conta criada automaticamente ao registrar um usuário
const DEFAULT_INITIAL_BALANCE = 0.00;

const createUser = async (user) => {
    const { name, email, password } = user;
    const hash = await bcrypt.hash(password, 10);

    // Usar uma conexão dedicada para suportar transação
    const conn = await connection.getConnection();
    try {
        await conn.beginTransaction();

        // 0. Verificar se e-mail já existe
        const [existing] = await conn.execute('SELECT id FROM user WHERE email = ? LIMIT 1', [email]);
        if (existing.length > 0) {
            const err = new Error('E-mail já cadastrado');
            err.code = 'EMAIL_EXISTS';
            throw err;
        }

        // 1. Criar usuário
        const userId = uuidv4();
        const userQuery = "INSERT INTO user (id, name, email, password) VALUES (?, ?, ?, ?)";
        await conn.execute(userQuery, [userId, name || null, email || null, hash || null]);

        // 2. Criar conta vinculada
        const accountId = uuidv4();
        const accountQuery = "INSERT INTO account (id, balance, user_id) VALUES (?, ?, ?)";
        await conn.execute(accountQuery, [accountId, DEFAULT_INITIAL_BALANCE, userId]);

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
