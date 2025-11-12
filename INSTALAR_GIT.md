# 📥 Como Instalar Git e Fazer Push para GitHub

## 🚀 Opção 1: Instalar Git (Recomendado)

### Passo 1: Baixar Git
1. Acesse: https://git-scm.com/download/win
2. Baixe o instalador para Windows
3. Execute o instalador

### Passo 2: Instalar Git
- Durante a instalação, use as opções padrão
- **Importante**: Marque a opção "Add Git to PATH" se aparecer
- Complete a instalação

### Passo 3: Reiniciar o Terminal
- Feche e abra novamente o PowerShell/CMD
- Ou reinicie o Cursor/VS Code

### Passo 4: Verificar Instalação
```powershell
git --version
```

Se aparecer a versão, está instalado! ✅

### Passo 5: Configurar Git (Primeira vez)
```powershell
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

### Passo 6: Fazer Push
Execute os comandos do arquivo `GIT_SETUP.md` ou use o script:
```powershell
.\push-to-github.ps1
```

---

## 🖥️ Opção 2: GitHub Desktop (Mais Fácil)

### Passo 1: Baixar GitHub Desktop
1. Acesse: https://desktop.github.com/
2. Baixe e instale o GitHub Desktop

### Passo 2: Fazer Login
1. Abra o GitHub Desktop
2. Faça login com sua conta GitHub (p4ran0rm4n)

### Passo 3: Adicionar Repositório
1. Clique em **File** → **Add Local Repository**
2. Navegue até: `C:\Users\24011482\Desktop\cursor_pasta`
3. Clique em **Add**

### Passo 4: Fazer Commit
1. Na aba **Changes**, você verá todos os arquivos
2. Digite uma mensagem de commit: "Initial commit: Sistema de Hotel"
3. Clique em **Commit to main**

### Passo 5: Publicar no GitHub
1. Clique em **Publish repository**
2. Nome: `acGLEN`
3. Descrição: "Sistema de Hotel com Backend e Frontend"
4. Marque **Keep this code private** se quiser (opcional)
5. Clique em **Publish repository**

✅ Pronto! Seu código estará no GitHub!

---

## 🌐 Opção 3: GitHub Web Interface

### Passo 1: Criar Repositório no GitHub
1. Acesse: https://github.com/new
2. Nome: `acGLEN`
3. Descrição: "Sistema de Hotel com Backend e Frontend"
4. **NÃO** marque "Initialize with README"
5. Clique em **Create repository**

### Passo 2: Fazer Upload Manual
1. No GitHub, clique em **uploading an existing file**
2. Arraste e solte os arquivos da pasta do projeto
3. **NÃO** inclua:
   - `node_modules/`
   - `.env` (arquivos de ambiente)
   - `dist/` (arquivos compilados)
4. Digite mensagem de commit: "Initial commit"
5. Clique em **Commit changes**

⚠️ **Nota**: Esta opção é trabalhosa para muitos arquivos

---

## 🔧 Opção 4: Usar Git Bash (Se Git estiver instalado)

Se o Git estiver instalado mas não funcionar no PowerShell:

1. Abra **Git Bash** (procure no menu Iniciar)
2. Navegue até a pasta:
   ```bash
   cd /c/Users/24011482/Desktop/cursor_pasta
   ```
3. Execute os comandos:
   ```bash
   git init
   git remote add origin https://github.com/p4ran0rm4n/acGLEN.git
   git add .
   git commit -m "Initial commit: Sistema de Hotel"
   git branch -M main
   git push -u origin main
   ```

---

## ✅ Recomendação

**Use a Opção 2 (GitHub Desktop)** - É a mais fácil e visual!

1. ✅ Interface gráfica amigável
2. ✅ Não precisa de comandos
3. ✅ Mostra mudanças visualmente
4. ✅ Gerencia autenticação automaticamente

---

## 🆘 Problemas Comuns

### "Git não é reconhecido"
- Git não está instalado ou não está no PATH
- Solução: Instale o Git (Opção 1) ou use GitHub Desktop (Opção 2)

### "Erro de autenticação"
- Use Personal Access Token em vez de senha
- GitHub → Settings → Developer settings → Personal access tokens

### "Remote origin already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/p4ran0rm4n/acGLEN.git
```

---

## 📞 Precisa de Ajuda?

Se nenhuma opção funcionar, você pode:
1. Usar GitHub Desktop (mais fácil)
2. Fazer upload manual via web (mais trabalhoso)
3. Instalar Git e usar comandos (mais técnico)

