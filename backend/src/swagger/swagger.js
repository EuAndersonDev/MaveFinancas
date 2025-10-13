require('dotenv').config();

const port = process.env.PORT || 3333;
const baseUrl = `http://localhost:${port}`;

const swaggerDocument = {
  openapi: "3.0.3",
  info: {
    title: "MaveFinancas API",
    version: "1.0.0",
    description: "Documentação da API do backend MaveFinancas"
  },
  servers: [
    { url: baseUrl, description: "Local" }
  ],
  security: [
    { BearerAuth: [] }
  ],
  tags: [
    { name: "Auth" },
    { name: "Users" },
    { name: "Accounts" },
    { name: "Transactions" }
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },
    schemas: {
      Error: {
        type: "object",
        properties: {
          error: { type: "string", example: "Mensagem de erro" }
        }
      },
      UserPublic: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "João" },
          email: { type: "string", example: "joao@email.com" }
        }
      },
      UserCreate: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: { type: "string" },
          email: { type: "string", format: "email" },
          password: { type: "string", format: "password" }
        }
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", format: "password" }
        }
      },
      LoginResponse: {
        type: "object",
        properties: {
          data: {
            type: "object",
            properties: {
              token: { type: "string" },
              user: { $ref: "#/components/schemas/UserPublic" }
            }
          }
        }
      },
      AccountCreate: {
        type: "object",
        required: ["balance", "user_id"],
        properties: {
          balance: { type: "number", example: 1000.5 },
          user_id: { type: "integer", example: 1 }
        }
      },
      Account: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          balance: { type: "number", example: 1000.5 },
          user_id: { type: "integer", example: 1 }
        }
      },
      BalanceResponse: {
        type: "object",
        properties: {
          balance: { type: "number", example: 1500.75 }
        }
      },
      TransactionCreate: {
        type: "object",
        required: ["description", "amount", "date", "type", "user_id", "account_id"],
        properties: {
          description: { type: "string", example: "Mercado" },
          amount: { type: "number", example: 250.9 },
          date: { type: "string", format: "date", example: "2025-09-01" },
          type: { type: "string", enum: ["credit", "debit"], example: "debit" },
          user_id: { type: "integer", example: 1 },
          account_id: { type: "integer", example: 2 }
        }
      },
      Transaction: {
        type: "object",
        properties: {
          id: { type: "integer", example: 10 },
          description: { type: "string" },
          amount: { type: "number" },
          date: { type: "string", format: "date" },
          type: { type: "string", enum: ["credit", "debit"] },
          user_id: { type: "integer" },
          account_id: { type: "integer" }
        }
      },
      MeResponse: {
        type: "object",
        properties: {
          userId: { type: "integer", example: 1 },
          email: { type: "string", format: "email", example: "user@email.com" }
        }
      }
    }
  },
  paths: {
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login do usuário",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" }
            }
          }
        },
        responses: {
          200: {
            description: "Login bem-sucedido",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/LoginResponse" } }
            }
          },
          400: { description: "Requisição inválida" },
          401: { description: "Credenciais inválidas" },
          500: { description: "Erro no servidor" }
        }
      }
    },
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Registro de usuário",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserCreate" }
            }
          }
        },
        responses: {
          201: { description: "Usuário criado" },
          500: { description: "Erro no servidor" }
        }
      }
    },
    "/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Dados do usuário autenticado",
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: "Informações do usuário extraídas do token",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/MeResponse" } }
            }
          },
          401: { description: "Token ausente ou inválido" }
        }
      }
    },
    "/users": {
      post: {
        tags: ["Users"],
        summary: "Criação de usuário",
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/UserCreate" } }
          }
        },
        responses: {
          201: { description: "Usuário criado" },
          500: { description: "Erro no servidor" }
        }
      }
    },
    "/accounts": {
      post: {
        tags: ["Accounts"],
        summary: "Cria conta",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/AccountCreate" } }
          }
        },
        responses: {
          201: { description: "Conta criada" },
          500: { description: "Erro no servidor" }
        }
      }
    },
    "/accounts/{id}": {
      get: {
        tags: ["Accounts"],
        summary: "Busca conta por ID",
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: {
          200: { description: "Conta retornada" },
          500: { description: "Erro no servidor" }
        }
      }
    },
    "/accounts/{id}/balance": {
      get: {
        tags: ["Accounts"],
        summary: "Consulta saldo da conta",
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: {
          200: { description: "Saldo da conta" },
          500: { description: "Erro no servidor" }
        }
      }
    },
    "/transactions": {
      get: {
        tags: ["Transactions"],
        summary: "Lista transações",
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: "Lista de transações" },
          500: { description: "Erro no servidor" }
        }
      },
      post: {
        tags: ["Transactions"],
        summary: "Cria transação",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/TransactionCreate" } }
          }
        },
        responses: {
          201: { description: "Transação criada" },
          500: { description: "Erro no servidor" }
        }
      }
    },
    "/transactions/{id}": {
      get: {
        tags: ["Transactions"],
        summary: "Busca transação por ID",
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: {
          200: { description: "Transação retornada" },
          500: { description: "Erro no servidor" }
        }
      },
      put: {
        tags: ["Transactions"],
        summary: "Atualiza transação",
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/TransactionCreate" } }
          }
        },
        responses: {
          200: { description: "Transação atualizada" },
          500: { description: "Erro no servidor" }
        }
      },
      delete: {
        tags: ["Transactions"],
        summary: "Remove transação",
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: {
          200: { description: "Transação removida" },
          500: { description: "Erro no servidor" }
        }
      }
    },
    "/dashboard": {
      get: {
        summary: "Obter dados do dashboard",
        description: "Retorna os dados do dashboard filtrados por data e usuário logado.",
        parameters: [
          {
            name: "date",
            in: "query",
            required: true,
            description: "Data para filtrar as transações (formato: YYYY-MM-DD).",
            schema: { type: "string", format: "date" }
          }
        ],
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: "Dados retornados com sucesso",
            content: {
              "application/json": {
                example: {
                  saldo: 1000.00,
                  valor_investido: 500.00,
                  total_transacoes: 10,
                  transacoes_por_categoria: [
                    { categoria: "deposit", quantidade: 5, valor_total: 500.00 },
                    { categoria: "withdrawal", quantidade: 5, valor_total: 300.00 }
                  ]
                }
              }
            }
          },
          400: { description: "Parâmetro de data ausente ou inválido" },
          500: { description: "Erro interno do servidor" }
        }
      }
    }
  }
};

module.exports = swaggerDocument;
