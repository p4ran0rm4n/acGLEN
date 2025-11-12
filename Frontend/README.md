# Frontend - SaaS

Frontend desenvolvido com React, TypeScript, Vite e Tailwind CSS.

## 🚀 Tecnologias

- **React 18** + **TypeScript**
- **Vite**
- **React Router**
- **Zustand** (State Management)
- **React Query** (Data Fetching)
- **Tailwind CSS**
- **Supabase** (Auth)

## 📦 Instalação

```bash
npm install
```

## 🔧 Configuração

1. Copie o `.env.example` para `.env`:

```bash
cp .env.example .env
```

2. Configure as variáveis:

```env
VITE_API_URL=http://localhost:3000/api
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## 🏃 Executar

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm run preview
```

## 📁 Estrutura

```
src/
├── components/      # Componentes reutilizáveis
├── pages/          # Páginas da aplicação
├── store/          # Estado global (Zustand)
└── App.tsx         # Componente principal
```

## 🎨 Features

- ✅ Autenticação (Login/Registro)
- ✅ Dashboard
- ✅ Gestão de Organizações
- ✅ Perfil do usuário
- ✅ Design responsivo
- ✅ Dark mode ready (Tailwind)

