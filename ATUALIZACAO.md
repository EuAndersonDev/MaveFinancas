# 🔄 Guia de Atualização - Sistema de Categorias

## 📝 O que mudou?

### Backend
1. ✅ **Nova tabela `category`** com categorias separadas por tipo (income/expense)
2. ✅ **Coluna `description` renomeada para `name`** em transaction
3. ✅ **Coluna `type` removida** de transaction (agora usa category_id)
4. ✅ **Valores com sinal**: receitas positivas, despesas negativas
5. ✅ **CRUD completo de categorias**: `/categories` endpoint

### Frontend
1. ✅ **Campo "Descrição" renomeado para "Nome"** na tabela de transações
2. ✅ **Types atualizados** para usar `name` ao invés de `description`

---

## 🚀 Como atualizar

### Opção 1: Banco de dados NOVO (recomendado)

Se você não tem dados importantes ou quer começar do zero:

```bash
# 1. Recriar banco
mysql -u root -p
DROP DATABASE IF EXISTS apiFinances;
exit;

# 2. Executar schema atualizado
mysql -u root -p < backend/database.sql

# 3. Inserir dados de teste
mysql -u root -p apiFinances < backend/seed-test-data.sql
```

### Opção 2: Migrar banco EXISTENTE

Se você já tem dados e quer preservá-los:

```bash
# Executar script de migração
mysql -u root -p apiFinances < backend/migration-add-categories.sql
```

Este script irá:
- ✅ Criar tabela `category` com 10 categorias padrão
- ✅ Adicionar coluna `category_id` em transaction
- ✅ Migrar dados existentes (type → category_id)
- ✅ Renomear `description` → `name`
- ✅ Ajustar sinais dos valores (+ receita, - despesa)
- ✅ Remover coluna `type`
- ✅ Recalcular saldos

---

## 📋 Categorias Padrão

### Receitas (Income)
- 💼 Salário - `#39BE00`
- 💻 Freelance - `#4CAF50`
- 📈 Investimentos - `#8BC34A`
- 💰 Outros Ganhos - `#CDDC39`

### Despesas (Expense)
- 🏠 Moradia - `#F44336`
- 🍔 Alimentação - `#E91E63`
- 🚗 Transporte - `#9C27B0`
- 🏥 Saúde - `#673AB7`
- 🎮 Lazer - `#3F51B5`
- 🛒 Outros Gastos - `#FF5722`

---

## 🔌 Nova API de Categorias

### GET /categories
Lista todas as categorias
```bash
curl http://localhost:3001/categories
```

### GET /categories/type/:type
Lista categorias por tipo (income ou expense)
```bash
curl http://localhost:3001/categories/type/income
curl http://localhost:3001/categories/type/expense
```

### GET /categories/:id
Busca categoria específica
```bash
curl http://localhost:3001/categories/111e8400-e29b-41d4-a716-446655440001
```

### POST /categories
Cria nova categoria
```bash
curl -X POST http://localhost:3001/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Educação",
    "type": "expense",
    "icon": "📚",
    "color": "#2196F3"
  }'
```

### PUT /categories/:id
Atualiza categoria
```bash
curl -X PUT http://localhost:3001/categories/:id \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Moradia",
    "type": "expense",
    "icon": "🏡",
    "color": "#FF0000"
  }'
```

### DELETE /categories/:id
Deleta categoria (apenas se não tiver transações)
```bash
curl -X DELETE http://localhost:3001/categories/:id
```

---

## 🔧 API de Transações Atualizada

Agora as transações usam `name` e `category_id`:

### POST /transactions
```json
{
  "name": "Salário Mensal",
  "amount": 6000.00,
  "date": "2025-11-01",
  "category_id": "111e8400-e29b-41d4-a716-446655440001",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "account_id": "650e8400-e29b-41d4-a716-446655440001"
}
```

**Importante**: 
- Receitas: `amount` positivo
- Despesas: `amount` negativo

---

## 🧪 Testar

1. **Reinicie o backend:**
```bash
cd backend
npm start
```

2. **Reinicie o frontend:**
```bash
cd frontend
npm run dev
```

3. **Faça login:**
- Email: teste@mave.com
- Senha: teste123

4. **Acesse a dashboard:**
- Você verá as transações com categorias reais!
- A coluna agora se chama "Nome" ao invés de "Descrição"

---

## ⚠️ Breaking Changes

### Backend
- ❌ Campo `description` → ✅ `name`
- ❌ Campo `type` → ✅ `category_id`
- ❌ Valores sempre positivos → ✅ Receitas +, Despesas -

### Frontend
- ❌ Type `Tx` com `description` → ✅ `name`
- ❌ Lógica baseada em `type` → ✅ Baseada em `amount` (sinal)

---

## 📁 Arquivos Modificados

### Backend
- ✅ `database.sql` - Schema atualizado
- ✅ `seed-test-data.sql` - Dados de teste com categorias
- ✅ `migration-add-categories.sql` - Script de migração
- ✅ `src/models/transactionModel.js` - Atualizado para categories
- ✅ `src/models/dashboardModel.js` - JOIN com categories
- ✅ `src/models/categoryModel.js` - **NOVO**
- ✅ `src/controllers/transactionController.js` - Validação atualizada
- ✅ `src/controllers/categoryController.js` - **NOVO**
- ✅ `src/routes/categoryRoutes.js` - **NOVO**
- ✅ `src/app.js` - Rota /categories adicionada

### Frontend
- ✅ `src/app/dashboard/page.tsx` - Type Tx atualizado
- ✅ `src/components/Dashboard/DashboardClient.tsx` - name
- ✅ `src/components/Dashboard/TransactionsSection/TransactionsSection.tsx` - name
- ✅ `src/components/Dashboard/TransactionsTable/TransactionsTable.tsx` - "Nome" + name

---

## 💡 Próximos Passos

1. **Implementar seletor de categorias no AddTransactionModal**
2. **Adicionar gerenciamento de categorias na interface**
3. **Implementar filtros por categoria na dashboard**
4. **Adicionar categorias customizadas por usuário**

---

✅ **Atualização completa!** Seu sistema agora tem categorias organizadas e a nomenclatura correta.
