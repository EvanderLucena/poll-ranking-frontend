# Poll Ranking - Frontend

Interface React para criação e votação em tier lists (rankings personalizados).

## 🛠️ Tecnologias

- **React 18**
- **Vite** (build tool)
- **React Router** (navegação)
- **Axios** (requisições HTTP)
- **@dnd-kit** (drag and drop)
- **TailwindCSS** (estilização)

## 🎨 Funcionalidades

- ✅ Criação de enquetes com categorias customizáveis
- ✅ Upload de imagens para itens
- ✅ Sistema de drag-and-drop para votação
- ✅ Visualização de estatísticas em tempo real
- ✅ Tema escuro moderno (paleta Slate)
- ✅ Interface responsiva

## 🚀 Executar Localmente

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Comandos

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

A aplicação estará disponível em: **http://localhost:5173**

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
# URL da API Backend
VITE_API_BASE_URL=http://localhost:8080

# Para produção
# VITE_API_BASE_URL=https://sua-api.railway.app
```

## 📁 Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/        # Componentes reutilizáveis
│   │   ├── Button.jsx
│   │   ├── Chip.jsx
│   │   ├── Input.jsx
│   │   ├── ItemCard.jsx
│   │   ├── Layout.jsx
│   │   └── TierRow.jsx
│   ├── pages/            # Páginas da aplicação
│   │   ├── CreatePoll.jsx
│   │   ├── PollList.jsx
│   │   ├── PollPage.jsx
│   │   └── ResultsPage.jsx
│   ├── lib/
│   │   └── api.js        # Configuração Axios
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Design System

### Paleta de Cores (Tema Escuro)

```css
/* Fundos */
--bg-primary: #0f172a    (slate-900)
--bg-secondary: #1e293b  (slate-800)
--bg-tertiary: #334155   (slate-700)

/* Textos */
--text-primary: #f8fafc   (slate-50)
--text-secondary: #cbd5e1 (slate-300)
--text-muted: #94a3b8     (slate-400)

/* Acentos */
--accent-primary: linear-gradient(indigo-600 → purple-600)
--accent-hover: linear-gradient(indigo-500 → purple-500)
```

### Componentes

- **Button**: Botão reutilizável com variantes
- **Input**: Campo de texto estilizado
- **Chip**: Tag removível para categorias/itens
- **ItemCard**: Card de item com drag-and-drop
- **TierRow**: Linha de categoria (tier)
- **Layout**: Layout principal com header e footer

## 🌐 Rotas

- `/` - Lista de enquetes
- `/create` - Criar nova enquete
- `/poll/:id` - Página de votação
- `/results/:id` - Estatísticas da enquete

## 📦 Build

```bash
# Gerar build otimizado
npm run build

# Arquivos gerados em: dist/
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte o repositório no Vercel
2. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variable**: `VITE_API_BASE_URL=https://sua-api.com`

### Netlify

1. Conecte o repositório no Netlify
2. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Environment Variable**: `VITE_API_BASE_URL=https://sua-api.com`

## 🔗 Links

- **Backend**: [poll-ranking-backend](https://github.com/SEU-USUARIO/poll-ranking-backend)
- **Demo**: (em breve)

## 📝 Licença

MIT
