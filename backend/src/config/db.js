require("dotenv").config();
const mysql = require("mysql2/promise");

const connection = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
});

module.exports = connection;

const testConnection = async () => {
    try {
        await connection.getConnection();
        console.log("Conexão com o banco ok");
    } catch (error) {
        console.error("Erro de conexão com o banco:", error);
    }
}

testConnection();