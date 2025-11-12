# 🏨 Sistema de Hotel - SaaS

Sistema completo de hotel com Backend (Express + TypeScript) e Frontend (React + Vite).

## 🚀 Tecnologias

### Backend
- Node.js + Express
- TypeScript
- Supabase (Auth + Database)
- Validações (CPF, Email, Senha Forte)

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Zustand (State Management)
- React Query

## 📋 Funcionalidades

- ✅ Autenticação completa (Login/Registro)
- ✅ Validação de email (formato e duplicidade)
- ✅ Validação de CPF brasileiro
- ✅ Validação de senha forte
- ✅ Validação de telefone brasileiro
- ✅ Perfil de usuário completo
- ✅ Dashboard
- ✅ Gestão de organizações

## 📁 Estrutura

```
.
├── Backend/          # API Backend (Express + TypeScript)
├── Frontend/         # Frontend (React + TypeScript + Vite)
├── .env              # Variáveis de ambiente
├── .env.example      # Exemplo de variáveis
└── package.json      # Workspaces do monorepo
```

## 🚀 Início Rápido

### 1. Instalar dependências

```bash
npm run install:all
```

### 2. Configurar variáveis de ambiente

Copie `.env.example` para `.env` e configure:

```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_ANON_KEY=your-anon-key

# Backend
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Frontend (criar Frontend/.env)
VITE_API_URL=http://localhost:3000/api
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Configurar banco de dados

Execute o SQL em `Backend/src/database/migrations.sql` no Supabase SQL Editor.

### 4. Executar aplicação

```bash
# Desenvolvimento (ambos)
npm run dev

# Apenas backend
npm run dev:backend

# Apenas frontend
npm run dev:frontend
```

## 📡 Endpoints da API

### Autenticação
- `POST /api/auth/register` - Registrar
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Usuário atual

### Organizações
- `GET /api/organizations` - Listar
- `POST /api/organizations` - Criar
- `GET /api/organizations/:id` - Obter
- `PUT /api/organizations/:id` - Atualizar
- `DELETE /api/organizations/:id` - Deletar

## 🛠️ Tecnologias

### Backend
- Node.js + Express
- TypeScript
- Supabase (Auth + Database)
- Helmet (Segurança)
- Rate Limiting

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand
- React Query

## 📝 Próximos Passos

- [ ] Sistema de pagamentos (Stripe)
- [ ] Planos de assinatura
- [ ] Notificações
- [ ] Email transacional
- [ ] Testes automatizados
- [ ] CI/CD
- [ ] Deploy em produção

## 📚 Documentação

- [Backend README](./Backend/README.md)
- [Frontend README](./Frontend/README.md)
- [SaaS Requirements](./SAAS_REQUIREMENTS.md)

