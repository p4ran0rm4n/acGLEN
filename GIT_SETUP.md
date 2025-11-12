# 🚀 Guia para Fazer Push para GitHub

## 📋 Pré-requisitos

1. **Git instalado** - Se não tiver, baixe em: https://git-scm.com/download/win
2. **Conta GitHub** - Você já tem: https://github.com/p4ran0rm4n/acGLEN

---

## 🔧 Passo a Passo

### 1. Abrir Git Bash ou PowerShell

Abra o terminal na pasta do projeto:
```
C:\Users\24011482\Desktop\cursor_pasta
```

### 2. Inicializar Git (se ainda não foi feito)

```bash
git init
```

### 3. Adicionar Remote do GitHub

```bash
git remote add origin https://github.com/p4ran0rm4n/acGLEN.git
```

Se já existir um remote, use:
```bash
git remote set-url origin https://github.com/p4ran0rm4n/acGLEN.git
```

### 4. Verificar arquivos que serão commitados

```bash
git status
```

### 5. Adicionar todos os arquivos (exceto os ignorados pelo .gitignore)

```bash
git add .
```

### 6. Fazer commit

```bash
git commit -m "Initial commit: Sistema de Hotel com Backend e Frontend"
```

### 7. Verificar branch atual

```bash
git branch
```

### 8. Renomear branch para main (se necessário)

```bash
git branch -M main
```

### 9. Fazer push para GitHub

**Primeira vez:**
```bash
git push -u origin main
```

**Próximas vezes:**
```bash
git push
```

---

## ⚠️ Importante

### Arquivos que NÃO serão enviados (protegidos pelo .gitignore):

- ✅ `.env` - Variáveis de ambiente (seguro!)
- ✅ `node_modules/` - Dependências
- ✅ `dist/` - Arquivos compilados
- ✅ Arquivos temporários

### Arquivos que SERÃO enviados:

- ✅ Código fonte (Backend/src, Frontend/src)
- ✅ Configurações (package.json, tsconfig.json, etc.)
- ✅ README.md
- ✅ Documentação

---

## 🔐 Segurança

**NUNCA faça commit de:**
- ❌ Arquivos `.env` com credenciais reais
- ❌ Chaves de API
- ❌ Senhas
- ❌ Tokens de acesso

**O `.gitignore` já protege isso!** ✅

---

## 📝 Comandos Úteis

### Ver o que será commitado:
```bash
git status
```

### Ver diferenças:
```bash
git diff
```

### Ver histórico:
```bash
git log
```

### Desfazer último commit (mantém arquivos):
```bash
git reset --soft HEAD~1
```

### Ver remotes configurados:
```bash
git remote -v
```

---

## 🐛 Problemas Comuns

### Erro: "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/p4ran0rm4n/acGLEN.git
```

### Erro: "fatal: not a git repository"
```bash
git init
```

### Erro: "fatal: refusing to merge unrelated histories"
```bash
git pull origin main --allow-unrelated-histories
```

### Erro de autenticação
Use token de acesso pessoal do GitHub:
1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Use o token como senha ao fazer push

---

## ✅ Checklist Antes do Push

- [ ] Git instalado
- [ ] Repositório inicializado (`git init`)
- [ ] Remote configurado (`git remote add origin`)
- [ ] Arquivos adicionados (`git add .`)
- [ ] Commit feito (`git commit`)
- [ ] Branch renomeada para `main` (se necessário)
- [ ] `.env` não está sendo commitado (verificar com `git status`)

---

## 🎯 Comandos Rápidos (Copiar e Colar)

```bash
# Inicializar Git
git init

# Adicionar remote
git remote add origin https://github.com/p4ran0rm4n/acGLEN.git

# Adicionar arquivos
git add .

# Fazer commit
git commit -m "Initial commit: Sistema de Hotel com Backend e Frontend"

# Renomear branch
git branch -M main

# Fazer push
git push -u origin main
```

---

## 📚 Próximos Passos

Após fazer o push:

1. ✅ Verificar no GitHub se os arquivos foram enviados
2. ✅ Adicionar descrição no repositório
3. ✅ Criar README.md mais detalhado (opcional)
4. ✅ Configurar GitHub Actions para CI/CD (opcional)

