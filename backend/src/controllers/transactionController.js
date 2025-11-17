const transactionModel = require('../models/transactionModel');

const addTransaction = async (req, res) => {
    const { name, amount, date, category_id, user_id, account_id } = req.body;
    
    if (!name || !amount || !category_id || !user_id || !account_id) {
        return res.status(400).json({ error: 'Campos obrigatórios: name, amount, category_id, user_id, account_id' });
    }

    try {
        const createTransaction = await transactionModel.addTransaction({ name, amount, date, category_id, user_id, account_id });
        return res.status(201).json(createTransaction);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to create transaction" });
    }
};

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await transactionModel.getAllTransactions();
        return res.status(200).json(transactions);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to get transactions" });
    }
};

const getTransactionById = async (req, res) => {
    const { id } = req.params;
    try {
        const transaction = await transactionModel.getTransactionById(id);
        if (!transaction || transaction.length === 0) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        return res.status(200).json(transaction[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to get transaction" });
    }
};

const updateTransaction = async (req, res) => {
    const { name, amount, date, category_id, user_id, account_id } = req.body;
    const { id } = req.params;
    
    if (!name || !amount || !category_id || !user_id || !account_id) {
        return res.status(400).json({ error: 'Campos obrigatórios: name, amount, category_id, user_id, account_id' });
    }

    try {
        const updateTransaction = await transactionModel.updateTransaction({ name, amount, date, category_id, user_id, account_id, id });
        return res.status(200).json({ message: 'Transaction updated successfully', data: updateTransaction });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to update transaction" });
    }
};

const deleteTransaction = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteTransaction = await transactionModel.deleteTransaction(id);
        return res.status(200).json({ message: 'Transaction deleted successfully', data: deleteTransaction });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to delete transaction" });
    }
};

module.exports = {
    addTransaction,
    getAllTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction
};