const connection = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const createAccount = async (account) => {
    const { balance, user_id } = account;
    const id = uuidv4();
    const query = "INSERT INTO account (id, balance, user_id) VALUES (?, ?, ?)";
    await connection.execute(query, [id, balance || 0, user_id]);
    return { id, balance: balance || 0, user_id };
};

const getAccountById = async (id) => {
    const query = "SELECT * FROM account WHERE id = ?";
    const [result] = await connection.execute(query, [id]);
    return result[0] || null;
};

const balance = async (id) => {
    const query = "SELECT balance FROM account WHERE id = ?";
    const [result] = await connection.execute(query, [id]);
    return result[0] || null;
};

module.exports = {
    createAccount,
    getAccountById,
    balance
};