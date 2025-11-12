# ⚡ Teste Rápido - Sistema de Hotel

## 🚀 Início Rápido (5 minutos)

### 1. Instalar Dependências

```bash
npm run install:all
```

### 2. Configurar `.env` na raiz

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-chave-aqui
SUPABASE_ANON_KEY=sua-chave-aqui
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 3. Configurar `Frontend/.env`

```env
VITE_API_URL=http://localhost:3000/api
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-aqui
```

### 4. Executar Migrations no Supabase

Execute `Backend/src/database/migrations_hotel.sql` no Supabase SQL Editor.

### 5. Rodar Backend (Terminal 1)

```bash
npm run dev:backend
```

Aguarde: `🚀 Servidor rodando na porta 3000`

### 6. Rodar Frontend (Terminal 2)

```bash
npm run dev:frontend
```

Aguarde: `Local: http://localhost:5173`

### 7. Testar no Navegador

1. Acesse: `http://localhost:5173`
2. Clique em **"Criar conta"** ou acesse `/register`
3. Preencha o formulário:
   - Nome: João Silva
   - Email: joao@teste.com
   - CPF: 123.456.789-00
   - Telefone: (11) 98765-4321
   - Endereço: Rua Teste, 123
   - Senha: Teste@123
   - Confirmar: Teste@123
4. Clique em **"Criar conta"**
5. Faça login com as credenciais criadas

---

## ✅ Verificações Rápidas

### Backend está funcionando?

```bash
curl http://localhost:3000/health
```

Deve retornar: `{"status":"ok","timestamp":"..."}`

### Frontend está funcionando?

Abra: `http://localhost:5173`

Deve mostrar a página de login.

---

## 🐛 Problemas Comuns

**Backend não inicia?**
- Verifique se o `.env` está na raiz
- Verifique se as dependências foram instaladas
- Verifique se a porta 3000 está livre

**Frontend não inicia?**
- Verifique se o `Frontend/.env` existe
- Verifique se as dependências foram instaladas

**Erro de autenticação?**
- Verifique se as migrations foram executadas
- Verifique se as credenciais do Supabase estão corretas

---

## 📚 Documentação Completa

Veja `GUIA_TESTE.md` para documentação detalhada.

