# Script para fazer push do projeto para GitHub
# Repositório: https://github.com/p4ran0rm4n/acGLEN

Write-Host "🚀 Configurando Git para GitHub..." -ForegroundColor Cyan

# Verificar se Git está instalado
try {
    $gitVersion = git --version
    Write-Host "✅ Git encontrado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git não encontrado!" -ForegroundColor Red
    Write-Host "Por favor, instale o Git: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# Verificar se já é um repositório Git
if (Test-Path .git) {
    Write-Host "✅ Repositório Git já inicializado" -ForegroundColor Green
} else {
    Write-Host "📦 Inicializando repositório Git..." -ForegroundColor Yellow
    git init
}

# Configurar remote
Write-Host "🔗 Configurando remote do GitHub..." -ForegroundColor Yellow
$remoteUrl = "https://github.com/p4ran0rm4n/acGLEN.git"

# Verificar se remote já existe
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    Write-Host "⚠️  Remote 'origin' já existe: $existingRemote" -ForegroundColor Yellow
    $update = Read-Host "Deseja atualizar para $remoteUrl? (S/N)"
    if ($update -eq "S" -or $update -eq "s") {
        git remote set-url origin $remoteUrl
        Write-Host "✅ Remote atualizado" -ForegroundColor Green
    }
} else {
    git remote add origin $remoteUrl
    Write-Host "✅ Remote adicionado" -ForegroundColor Green
}

# Verificar status
Write-Host "`n📋 Status do repositório:" -ForegroundColor Cyan
git status

# Perguntar se deseja continuar
Write-Host "`n❓ Deseja continuar com o commit e push? (S/N)" -ForegroundColor Yellow
$continue = Read-Host

if ($continue -ne "S" -and $continue -ne "s") {
    Write-Host "❌ Operação cancelada" -ForegroundColor Red
    exit 0
}

# Adicionar arquivos
Write-Host "`n📦 Adicionando arquivos..." -ForegroundColor Yellow
git add .

# Verificar se há algo para commitar
$status = git status --porcelain
if (-not $status) {
    Write-Host "⚠️  Nenhuma alteração para commitar" -ForegroundColor Yellow
    exit 0
}

# Fazer commit
Write-Host "💾 Fazendo commit..." -ForegroundColor Yellow
$commitMessage = "Initial commit: Sistema de Hotel com Backend e Frontend"
git commit -m $commitMessage

# Verificar branch
$currentBranch = git branch --show-current
Write-Host "🌿 Branch atual: $currentBranch" -ForegroundColor Cyan

# Renomear para main se necessário
if ($currentBranch -ne "main") {
    Write-Host "🔄 Renomeando branch para 'main'..." -ForegroundColor Yellow
    git branch -M main
}

# Fazer push
Write-Host "`n🚀 Fazendo push para GitHub..." -ForegroundColor Yellow
Write-Host "⚠️  Você pode precisar fazer login no GitHub" -ForegroundColor Yellow
Write-Host "   Use seu token de acesso pessoal como senha" -ForegroundColor Yellow
Write-Host ""

try {
    git push -u origin main
    Write-Host "`n✅ Push realizado com sucesso!" -ForegroundColor Green
    Write-Host "🔗 Repositório: https://github.com/p4ran0rm4n/acGLEN" -ForegroundColor Cyan
} catch {
    Write-Host "`n❌ Erro ao fazer push" -ForegroundColor Red
    Write-Host "Verifique suas credenciais do GitHub" -ForegroundColor Yellow
    Write-Host "Você pode precisar configurar autenticação:" -ForegroundColor Yellow
    Write-Host "  git config --global user.name 'Seu Nome'" -ForegroundColor White
    Write-Host "  git config --global user.email 'seu@email.com'" -ForegroundColor White
}

