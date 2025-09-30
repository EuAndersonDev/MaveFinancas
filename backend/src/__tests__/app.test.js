const path = require('path');
const request = require('supertest');

// Mocks for mounted routers and swagger to create predictable endpoints for tests
jest.mock(path.resolve(__dirname, '../swagger/swaggerDocs'), () => {
    return jest.fn((app) => {
        app.get('/__swagger', (req, res) => res.status(200).json({ ok: true, swagger: true }));
    });
});

jest.mock(path.resolve(__dirname, '../routes/authRoutes'), () => {
    const express = require('express'); // <- importe dentro do factory
    const router = express.Router();
    router.post('/login', (req, res) => res.status(200).json({ ok: true, scope: 'auth', action: 'login' }));
    router.post('/register', (req, res) => res.status(201).json({ ok: true, scope: 'auth', action: 'register' }));
    return router;
});

jest.mock(path.resolve(__dirname, '../routes/transactionsRoutes'), () => {
    const express = require('express'); // <- importe dentro do factory
    const router = express.Router();
    router.get('/', (req, res) => res.status(200).json([{ id: 1 }]));
    router.post('/', (req, res) => res.status(201).json({ id: 101 }));
    router.get('/:id', (req, res) => res.status(200).json({ id: Number(req.params.id) }));
    router.put('/:id', (req, res) => res.status(200).json({ id: Number(req.params.id), updated: true }));
    router.delete('/:id', (req, res) => res.status(204).send());
    return router;
});

jest.mock(path.resolve(__dirname, '../routes/accountsRoutes'), () => {
    const express = require('express'); // <- importe dentro do factory
    const router = express.Router();
    router.get('/', (req, res) => res.status(200).json([{ id: 1 }]));
    router.post('/', (req, res) => res.status(201).json({ id: 201 }));
    router.get('/:id', (req, res) => res.status(200).json({ id: Number(req.params.id) }));
    router.put('/:id', (req, res) => res.status(200).json({ id: Number(req.params.id), updated: true }));
    router.delete('/:id', (req, res) => res.status(204).send());
    return router;
});

jest.mock(path.resolve(__dirname, '../routes/usersRoutes'), () => {
    const express = require('express'); // <- importe dentro do factory
    const router = express.Router();
    router.get('/', (req, res) => res.status(200).json([{ id: 1 }]));
    router.post('/', (req, res) => res.status(201).json({ id: 301 }));
    router.get('/boom', (req, res, next) => next(new Error('boom')));
    router.get('/:id', (req, res) => res.status(200).json({ id: Number(req.params.id) }));
    router.put('/:id', (req, res) => res.status(200).json({ id: Number(req.params.id), updated: true }));
    router.delete('/:id', (req, res) => res.status(204).send());
    return router;
});

// Agora importe o app depois dos mocks
const app = require('../app');

function healthEndpoints() {
    describe('Health endpoints', () => {
        it('GET /health should return ok with timestamp', async () => {
            const res = await request(app).get('/health');
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('status', 'ok');
            expect(res.body).toHaveProperty('timestamp');
        });
    });
}

function authEndpoints() {
    describe('Auth endpoints', () => {
        it('POST /auth/login should succeed', async () => {
            const res = await request(app).post('/auth/login').send({ email: 'a@b.com', password: 'x' });
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject({ ok: true, scope: 'auth', action: 'login' });
        });

        it('POST /auth/register should create', async () => {
            const res = await request(app).post('/auth/register').send({ email: 'a@b.com', password: 'x' });
            expect(res.status).toBe(201);
            expect(res.body).toMatchObject({ ok: true, scope: 'auth', action: 'register' });
        });
    });
}

function transactionsEndpoints() {
    describe('Transactions endpoints', () => {
        it('GET /transactions should list', async () => {
            const res = await request(app).get('/transactions');
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('POST /transactions should create', async () => {
            const res = await request(app).post('/transactions').send({ amount: 10 });
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('id');
        });

        it('GET /transactions/:id should retrieve', async () => {
            const res = await request(app).get('/transactions/1');
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('id', 1);
        });

        it('PUT /transactions/:id should update', async () => {
            const res = await request(app).put('/transactions/1').send({ amount: 20 });
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject({ id: 1, updated: true });
        });

        it('DELETE /transactions/:id should delete', async () => {
            const res = await request(app).delete('/transactions/1');
            expect(res.status).toBe(204);
        });
    });
}

function accountsEndpoints() {
    describe('Accounts endpoints', () => {
        it('GET /accounts should list', async () => {
            const res = await request(app).get('/accounts');
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('POST /accounts should create', async () => {
            const res = await request(app).post('/accounts').send({ name: 'Wallet' });
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('id');
        });

        it('GET /accounts/:id should retrieve', async () => {
            const res = await request(app).get('/accounts/2');
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('id', 2);
        });

        it('PUT /accounts/:id should update', async () => {
            const res = await request(app).put('/accounts/2').send({ name: 'Main' });
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject({ id: 2, updated: true });
        });

        it('DELETE /accounts/:id should delete', async () => {
            const res = await request(app).delete('/accounts/2');
            expect(res.status).toBe(204);
        });
    });
}

function usersEndpoints() {
    describe('Users endpoints', () => {
        it('GET /users should list', async () => {
            const res = await request(app).get('/users');
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('POST /users should create', async () => {
            const res = await request(app).post('/users').send({ name: 'John' });
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('id');
        });

        it('GET /users/:id should retrieve', async () => {
            const res = await request(app).get('/users/3');
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('id', 3);
        });

        it('PUT /users/:id should update', async () => {
            const res = await request(app).put('/users/3').send({ name: 'Jane' });
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject({ id: 3, updated: true });
        });

        it('DELETE /users/:id should delete', async () => {
            const res = await request(app).delete('/users/3');
            expect(res.status).toBe(204);
        });

        it('GET /users/boom should trigger error middleware', async () => {
            const res = await request(app).get('/users/boom');
            expect(res.status).toBe(500);
            expect(res.body).toHaveProperty('error', 'Erro interno do servidor');
        });
    });
}

function miscEndpoints() {
    describe('Misc endpoints', () => {
        it('GET /__swagger should be exposed', async () => {
            const res = await request(app).get('/__swagger');
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject({ ok: true, swagger: true });
        });

        it('GET /unknown should return 404 from fallback', async () => {
            const res = await request(app).get('/unknown-non-existent-route');
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty('error', 'Rota não encontrada');
        });
    });
}

// Run grouped tests
healthEndpoints();
authEndpoints();
transactionsEndpoints();
accountsEndpoints();
usersEndpoints();
miscEndpoints();