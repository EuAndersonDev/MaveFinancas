const connection = require('../config/db');
const bcrypt = require('bcrypt');

const createUser = async (user) => {
    const { name, email, password } = user;
    const hash = await bcrypt.hash(password, 10);
    const query = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
    const [result] = await connection.execute(query, [name || null, email || null, hash || null]);
    return { id: result.insertId, name, email };
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
