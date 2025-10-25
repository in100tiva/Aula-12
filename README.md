# Sistema de Autenticação - Vite + React + Supabase

Aplicação moderna de autenticação construída com Vite, React, TypeScript, React Query e React Router, integrada com Supabase para gerenciamento de autenticação e banco de dados.

## 🚀 Tecnologias

- **Vite** - Build tool rápida e moderna
- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **React Query (TanStack Query)** - Gerenciamento de estado server state
- **React Router** - Roteamento para aplicações React
- **Supabase** - Backend-as-a-Service (Auth + Database)

## 📋 Pré-requisitos

- Node.js 16+ 
- npm ou yarn

## 🛠️ Instalação

1. Clone o repositório ou navegue até o diretório do projeto

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente (arquivo `.env` já está configurado com as credenciais):
```
VITE_SUPABASE_URL=https://vbdameylfujnpmbrhreh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

## 🎯 Executando o Projeto

### Desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build de Produção
```bash
npm run build
```

### Preview do Build
```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/        # Componentes reutilizáveis
│   └── ProtectedRoute.tsx
├── contexts/          # Contexts React
│   └── AuthContext.tsx
├── hooks/             # Custom hooks
│   ├── useAuth.ts
│   └── useProfile.ts
├── pages/             # Páginas da aplicação
│   ├── Login.tsx
│   ├── Register.tsx
│   └── Dashboard.tsx
├── services/          # Integrações externas
│   └── supabase.ts
├── types/             # TypeScript types
│   └── index.ts
├── App.tsx            # Componente principal com rotas
├── main.tsx           # Entry point da aplicação
└── styles.css         # Estilos globais
```

## 🔐 Funcionalidades

### Autenticação
- ✅ Cadastro de novos usuários
- ✅ Login com email e senha
- ✅ Logout
- ✅ Proteção de rotas
- ✅ Persistência de sessão

### Perfil de Usuário
- ✅ Armazenamento de dados do perfil (nome, sobrenome, idade)
- ✅ Exibição de informações no dashboard
- ✅ Integração com tabela `user_profiles` do Supabase

## 🗄️ Banco de Dados

O projeto utiliza a tabela `user_profiles` no Supabase com a seguinte estrutura:

- `id` (uuid, primary key, FK para auth.users)
- `name` (varchar)
- `last_name` (varchar)
- `age` (integer, check: 0 < age < 150)
- `full_name` (varchar, generated column)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

**RLS (Row Level Security) está habilitado na tabela** com as seguintes políticas:
- Usuários podem visualizar seu próprio perfil
- Usuários podem inserir seu próprio perfil (quando autenticados)
- Usuários podem atualizar seu próprio perfil

**Trigger Automática**: Uma trigger (`on_email_confirmed_create_profile`) é executada quando um usuário confirma seu email, automaticamente criando o perfil na tabela `user_profiles` com os dados do `user_metadata`.

## 🔄 Fluxo de Uso

1. **Registro**: Usuário cria conta em `/register` com nome, sobrenome, idade, email e senha
2. **Verificação**: Email de confirmação enviado pelo Supabase
3. **Confirmação do Email**: Usuário clica no link de confirmação no email
   - **Importante**: Quando o usuário confirma o email, uma trigger no banco de dados automaticamente cria o perfil na tabela `user_profiles`
4. **Login**: Após verificar email, usuário faz login em `/login`
5. **Dashboard**: Usuário autenticado acessa `/dashboard` protegido e vê suas informações
6. **Logout**: Usuário pode fazer logout e retornar à tela de login

## 🛡️ Recursos de Segurança

- RLS (Row Level Security) habilitado no banco
- Rotas protegidas que verificam autenticação
- Tokens JWT gerenciados pelo Supabase
- Credenciais armazenadas como variáveis de ambiente

## 📝 Desenvolvimento

### Adicionar Nova Página

1. Crie o componente em `src/pages/`
2. Adicione a rota em `src/App.tsx`
3. Se precisar de proteção, envolva com `<ProtectedRoute>`

### Adicionar Nova Mutation/Query

1. Crie hooks em `src/hooks/`
2. Use `useMutation` para operações de escrita
3. Use `useQuery` para operações de leitura
4. Invalidar queries relevantes no `onSuccess` das mutations

## 🔗 Links Úteis

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Supabase](https://supabase.com/docs)

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.
