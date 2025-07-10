# SafeTracker Frontend

Este é o frontend do SafeTracker, uma aplicação React com TypeScript que agora roda independentemente.

## 🚀 Setup Rápido

1. **Instale as dependências:**

```bash
npm install
```

2. **Execute o servidor de desenvolvimento:**

```bash
npm run dev
```

3. **Acesse a aplicação:**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📦 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria o build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linter

## 🏗️ Estrutura do Projeto

```
├── src/
│   ├── components/     # Componentes React reutilizáveis
│   ├── pages/         # Páginas da aplicação
│   ├── hooks/         # Custom hooks
│   ├── lib/           # Utilitários e configurações
│   ├── types/         # Definições de tipos TypeScript
│   ├── App.tsx        # Componente principal
│   ├── main.tsx       # Ponto de entrada
│   └── index.css      # Estilos globais
├── index.html         # Template HTML
├── package.json       # Dependências e scripts
├── vite.config.ts     # Configuração do Vite
├── tailwind.config.ts # Configuração do Tailwind CSS
└── tsconfig.json      # Configuração do TypeScript
```

## 🛠️ Tecnologias

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de CSS
- **Radix UI** - Componentes acessíveis
- **React Query** - Gerenciamento de estado do servidor
- **Zustand** - Gerenciamento de estado local
- **Wouter** - Roteamento
- **React Hook Form** - Formulários
- **Zod** - Validação de dados

## 🎨 UI Components

O projeto usa o sistema de design shadcn/ui com componentes do Radix UI, oferecendo:

- Componentes acessíveis e customizáveis
- Tema escuro/claro
- Animações suaves
- Design responsivo

## 🔧 Desenvolvimento

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Instale as dependências: `npm install`
4. Execute o servidor de desenvolvimento: `npm run dev`
5. Faça suas alterações
6. Teste localmente
7. Envie um pull request

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:

- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🌐 Deploy

Para fazer deploy da aplicação:

```bash
npm run build
```

Os arquivos de produção estarão na pasta `dist/` e podem ser servidos por qualquer servidor web estático.
