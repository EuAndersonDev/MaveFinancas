const connection = require('../config/db.js');
const { v4: uuidv4 } = require('uuid');

const addTransaction = async (transaction) => {
    const dataUTC = new Date().toISOString().split("T")[0];
    const { name, amount, date, category_id, user_id, account_id } = transaction;
    const finalDate = date || dataUTC;
    const id = uuidv4();
    const query = "INSERT INTO transaction (id, name, amount, date, category_id, user_id, account_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    await connection.execute(query, [id, name, amount, finalDate, category_id, user_id, account_id]);

    // Atualiza saldo (amount já vem com sinal correto: positivo para receita, negativo para despesa)
    const balanceQuery = "UPDATE account SET balance = balance + ? WHERE id = ?";
    await connection.execute(balanceQuery, [amount, account_id]);

    return { id, name, amount, date: finalDate, category_id, user_id, account_id };
};

const getAllTransactions = async () => {
    const query = `
        SELECT t.*, c.name as category_name, c.type as category_type, c.icon, c.color
        FROM transaction t
        INNER JOIN category c ON t.category_id = c.id
        ORDER BY t.date DESC, t.created_at DESC
    `;
    const [transactions] = await connection.execute(query);
    return transactions;
};

const getTransactionById = async (id) => {
    const query = `
        SELECT t.*, c.name as category_name, c.type as category_type, c.icon, c.color
        FROM transaction t
        INNER JOIN category c ON t.category_id = c.id
        WHERE t.id = ?
    `;
    const [transaction] = await connection.execute(query, [id]);
    return transaction;
};

const updateTransaction = async (transaction) => {
    const { name, amount, date, category_id, user_id, account_id, id } = transaction;
    
    // Busca transação antiga para reverter saldo
    const [oldTx] = await connection.execute("SELECT amount, account_id FROM transaction WHERE id = ?", [id]);
    if (oldTx.length > 0) {
        const oldAmount = oldTx[0].amount;
        const oldAccountId = oldTx[0].account_id;
        // Reverte saldo antigo
        await connection.execute("UPDATE account SET balance = balance - ? WHERE id = ?", [oldAmount, oldAccountId]);
    }

    const query = "UPDATE transaction SET name = ?, amount = ?, date = ?, category_id = ?, user_id = ?, account_id = ? WHERE id = ?";
    const [result] = await connection.execute(query, [
        name || null,
        amount || null,
        date || null,
        category_id || null,
        user_id || null,
        account_id || null,
        id || null
    ]);

    // Aplica novo saldo
    await connection.execute("UPDATE account SET balance = balance + ? WHERE id = ?", [amount, account_id]);

    return result;
};

const deleteTransaction = async (id) => {
    // Busca transação para reverter saldo
    const [tx] = await connection.execute("SELECT amount, account_id FROM transaction WHERE id = ?", [id]);
    if (tx.length > 0) {
        const amount = tx[0].amount;
        const accountId = tx[0].account_id;
        // Reverte saldo
        await connection.execute("UPDATE account SET balance = balance - ? WHERE id = ?", [amount, accountId]);
    }

    const query = "DELETE FROM transaction WHERE id = ?";
    const [result] = await connection.execute(query, [id]);
    return result;
};

module.exports = {
    addTransaction,
    getAllTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction
};