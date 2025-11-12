# 🧪 Guia de Testes - Sistema de Hotel

## 📋 Pré-requisitos

1. **Node.js** instalado (versão 18 ou superior)
2. **npm** instalado (versão 9 ou superior)
3. **Conta no Supabase** configurada
4. **Banco de dados** configurado com as migrations

---

## 🔧 Passo 1: Configurar Variáveis de Ambiente

### 1.1 Configurar `.env` na raiz do projeto

Crie ou edite o arquivo `.env` na raiz do projeto:

```env
# Supabase Configuration
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-aqui
SUPABASE_ANON_KEY=sua-anon-key-aqui

# Backend Configuration
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 1.2 Configurar `Frontend/.env`

Crie o arquivo `Frontend/.env`:

```env
VITE_API_URL=http://localhost:3000/api
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key-aqui
```

---

## 🗄️ Passo 2: Configurar Banco de Dados

1. Acesse o **Supabase Dashboard**
2. Vá em **SQL Editor**
3. Execute o arquivo `Backend/src/database/migrations_hotel.sql`
4. Verifique se as tabelas foram criadas:
   - `user_profiles`
   - `reservations`
   - `rooms`
   - `reservation_rooms`

---

## 📦 Passo 3: Instalar Dependências

### Opção 1: Instalar tudo de uma vez (recomendado)

```bash
npm run install:all
```

### Opção 2: Instalar separadamente

```bash
# Na raiz do projeto
npm install

# Backend
cd Backend
npm install

# Frontend
cd ../Frontend
npm install
```

---

## 🚀 Passo 4: Executar o Backend

### Opção 1: Usando o script do monorepo

```bash
# Na raiz do projeto
npm run dev:backend
```

### Opção 2: Diretamente no Backend

```bash
cd Backend
npm run dev
```

**O backend estará rodando em:** `http://localhost:3000`

### Verificar se o backend está funcionando:

Abra o navegador ou use curl:

```bash
# No navegador
http://localhost:3000/health

# Ou no terminal
curl http://localhost:3000/health
```

**Resposta esperada:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

---

## 🎨 Passo 5: Executar o Frontend

### Opção 1: Usando o script do monorepo

```bash
# Na raiz do projeto (em outro terminal)
npm run dev:frontend
```

### Opção 2: Diretamente no Frontend

```bash
cd Frontend
npm run dev
```

**O frontend estará rodando em:** `http://localhost:5173`

---

## 🧪 Passo 6: Testar o Sistema

### 6.1 Testar Registro de Usuário

1. Acesse: `http://localhost:5173/register`
2. Preencha o formulário:
   - **Nome**: João Silva
   - **Email**: joao@email.com (use um email válido)
   - **CPF**: 123.456.789-00 (use um CPF válido)
   - **Telefone**: (11) 98765-4321
   - **Endereço**: Rua Exemplo, 123
   - **Cidade**: São Paulo (opcional)
   - **Estado**: SP (opcional)
   - **CEP**: 01234-567 (opcional)
   - **Senha**: MinhaSenh@123 (mínimo 8 caracteres, 1 maiúscula, 1 minúscula, 1 número, 1 especial)
   - **Confirmar Senha**: MinhaSenh@123

3. Clique em **"Criar conta"**
4. Verifique se apareceu mensagem de sucesso
5. Você será redirecionado para o dashboard

### 6.2 Testar Validações

#### Teste de Email Inválido:
- Tente registrar com email inválido: `email-invalido`
- Deve aparecer: "Email inválido ou formato incorreto"

#### Teste de Email Duplicado:
- Tente registrar com o mesmo email duas vezes
- Deve aparecer: "Este email já está cadastrado"

#### Teste de CPF Inválido:
- Tente registrar com CPF inválido: `111.111.111-11`
- Deve aparecer: "CPF inválido"

#### Teste de CPF Duplicado:
- Tente registrar com o mesmo CPF duas vezes
- Deve aparecer: "Este CPF já está cadastrado"

#### Teste de Senha Fraca:
- Tente registrar com senha fraca: `123456`
- Deve aparecer: "A senha deve ter no mínimo 8 caracteres" ou outra mensagem de validação

#### Teste de Telefone Inválido:
- Tente registrar com telefone inválido: `123`
- Deve aparecer: "Telefone inválido"

### 6.3 Testar Login

1. Acesse: `http://localhost:5173/login`
2. Use as credenciais criadas no registro:
   - **Email**: joao@email.com
   - **Senha**: MinhaSenh@123
3. Clique em **"Entrar"**
4. Você deve ser redirecionado para o dashboard

### 6.4 Testar Dashboard

1. Após fazer login, você verá o dashboard
2. Verifique se aparecem:
   - Estatísticas (Organizações, Membros, etc.)
   - Informações do usuário

### 6.5 Testar Perfil

1. Clique em **"Perfil"** no menu
2. Verifique se todos os dados aparecem:
   - Nome
   - Email
   - CPF (formatado)
   - Telefone (formatado)
   - Endereço
   - Cidade, Estado, CEP
3. Clique em **"Editar"**
4. Modifique alguns campos
5. Clique em **"Salvar"**
6. Verifique se as alterações foram salvas

---

## 🔍 Testar API Diretamente (Postman/Insomnia/curl)

### Testar Health Check

```bash
curl http://localhost:3000/health
```

### Testar Registro

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Silva",
    "email": "maria@email.com",
    "password": "MinhaSenh@123",
    "cpf": "987.654.321-00",
    "phone": "(11) 91234-5678",
    "address": "Av. Exemplo, 456",
    "city": "São Paulo",
    "state": "SP",
    "zip_code": "01234-567"
  }'
```

### Testar Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "maria@email.com",
    "password": "MinhaSenh@123"
  }'
```

**Salve o `access_token` da resposta!**

### Testar Obter Perfil (requer autenticação)

```bash
curl -X GET http://localhost:3000/api/profile \
  -H "Authorization: Bearer SEU_ACCESS_TOKEN_AQUI"
```

### Testar Atualizar Perfil

```bash
curl -X PUT http://localhost:3000/api/profile \
  -H "Authorization: Bearer SEU_ACCESS_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Silva Santos",
    "city": "Rio de Janeiro"
  }'
```

---

## 🐛 Solução de Problemas

### Backend não inicia

1. **Verifique se o Node.js está instalado:**
   ```bash
   node --version
   ```

2. **Verifique se as dependências foram instaladas:**
   ```bash
   cd Backend
   npm list
   ```

3. **Verifique se o `.env` está configurado:**
   - Confirme que o arquivo `.env` existe na raiz
   - Verifique se as variáveis estão corretas

4. **Verifique se a porta 3000 está livre:**
   ```bash
   # Windows
   netstat -ano | findstr :3000
   
   # Linux/Mac
   lsof -i :3000
   ```

### Frontend não inicia

1. **Verifique se as dependências foram instaladas:**
   ```bash
   cd Frontend
   npm list
   ```

2. **Verifique se o `Frontend/.env` está configurado**

3. **Verifique se a porta 5173 está livre**

### Erro de CORS

- Verifique se o `FRONTEND_URL` no `.env` do backend está correto
- Verifique se o frontend está rodando na porta 5173

### Erro de autenticação

- Verifique se as credenciais do Supabase estão corretas
- Verifique se as migrations foram executadas
- Verifique se o usuário foi criado corretamente

### Erro de validação

- Verifique se está usando um CPF válido (não use 111.111.111-11)
- Verifique se a senha atende aos requisitos
- Verifique se o email é válido

---

## 📝 Checklist de Testes

- [ ] Backend inicia sem erros
- [ ] Frontend inicia sem erros
- [ ] Health check funciona
- [ ] Registro de usuário funciona
- [ ] Validação de email funciona
- [ ] Validação de CPF funciona
- [ ] Validação de senha forte funciona
- [ ] Validação de telefone funciona
- [ ] Login funciona
- [ ] Dashboard carrega
- [ ] Perfil exibe dados corretos
- [ ] Edição de perfil funciona
- [ ] Formatação automática funciona (CPF, telefone, CEP)

---

## 🎯 Próximos Passos

Após testar o sistema básico, você pode:

1. Testar fluxos completos de reservas
2. Adicionar mais validações
3. Implementar testes automatizados
4. Adicionar funcionalidades de hotel (quartos, reservas, etc.)

---

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs do backend no terminal
2. Verifique o console do navegador (F12)
3. Verifique se todas as dependências foram instaladas
4. Verifique se as migrations foram executadas
5. Verifique se as variáveis de ambiente estão corretas

