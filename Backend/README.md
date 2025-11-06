# Backend API - SaaS

Backend API desenvolvido com Express, TypeScript e Supabase.

## 🚀 Tecnologias

- **Node.js** + **Express**
- **TypeScript**
- **Supabase** (Auth + Database)
- **Helmet** (Segurança)
- **CORS**
- **Rate Limiting**

## 📦 Instalação

```bash
npm install
```

## 🔧 Configuração

1. Copie o `.env` da raiz do projeto ou configure as variáveis:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

2. Execute as migrations no Supabase SQL Editor (veja `src/database/migrations.sql`)

## 🏃 Executar

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

## 📡 Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/refresh` - Atualizar token
- `POST /api/auth/reset-password` - Solicitar reset de senha
- `GET /api/auth/me` - Obter usuário autenticado

### Usuários
- `GET /api/users` - Listar usuários (admin)
- `GET /api/users/:id` - Obter usuário
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário (admin)

### Organizações
- `GET /api/organizations` - Listar organizações
- `POST /api/organizations` - Criar organização
- `GET /api/organizations/:id` - Obter organização
- `PUT /api/organizations/:id` - Atualizar organização
- `DELETE /api/organizations/:id` - Deletar organização

## 🔐 Autenticação

Todas as rotas protegidas requerem o header:
```
Authorization: Bearer <token>
```

## 📝 Estrutura

```
src/
├── index.ts                 # Entry point
├── middleware/
│   └── auth.middleware.ts   # Middleware de autenticação
├── routes/
│   ├── auth.routes.ts       # Rotas de autenticação
│   ├── user.routes.ts       # Rotas de usuários
│   └── organization.routes.ts # Rotas de organizações
└── database/
    └── migrations.sql      # Migrations do banco
```

