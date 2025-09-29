const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await userModel.createUser({ name, email, password });
        return res.status(201).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to create user" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ error: 'Configuração inválida do JWT' });
    }

    try {
        const userDb = await userModel.findByEmail(email);
        if (!userDb) return res.status(401).json({ error: 'Credenciais inválidas' });

        const ok = await bcrypt.compare(password, userDb.password);
        if (!ok) return res.status(401).json({ error: 'Credenciais inválidas' });

        const token = jwt.sign(
            { sub: userDb.id, email: userDb.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES || '1h' }
        );

        return res.json({
            data: {
                token,
                user: { id: userDb.id, name: userDb.name, email: userDb.email }
            }
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Erro no login' });
    }
};



module.exports = {
    createUser,
    login
};