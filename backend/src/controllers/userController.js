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
        return res.json({ token });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Erro no login' });
    }
};



module.exports = {
    createUser,
    login
};