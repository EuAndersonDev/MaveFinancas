require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Documentação Swagger
const swagger = require('./swagger/swaggerDocs');
swagger(app);

// Healthcheck simples
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// Rotas modulares por recurso (sem agregador /api)
app.use('/auth', require('./routes/authRoutes'));
app.use('/transactions', require('./routes/transactionsRoutes'));
app.use('/accounts', require('./routes/accountsRoutes'));
app.use('/users', require('./routes/usersRoutes'));

// Middleware 404
app.use((req, res, next) => {
    return res.status(404).json({ error: 'Rota não encontrada' });
});

// Middleware de erro genérico
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno do servidor' });
});

module.exports = app;
