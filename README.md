![logo](https://res.cloudinary.com/dqx5v6hfi/image/upload/v1783269392/fca5c027-66bf-4dd1-844a-126f1c55aed8.png)

## Descrição

Este projeto é um site desenvolvido com Next.js que funciona como um portal de filmes e séries, com a proposta futura de atuar como um gateway de pagamento para doações, similar ao Livepix. A ideia é permitir que streamers recebam doações para reagir a filmes e séries, criando uma experiência interativa entre o streamer e sua audiência. Atualmente, o foco está na exibição de conteúdo de filmes e séries, com funcionalidades de navegação e busca.

## Funcionalidades

- **Listagem de Filmes e Séries:** Exibe uma vasta coleção de filmes e séries, provavelmente integrada com uma API de banco de dados de filmes (como o TMDB).

- **Detalhes de Filmes e Séries:** Páginas dedicadas para cada título, mostrando informações detalhadas.

- **Funcionalidades Futuras (Gateway de Pagamento/Doação):** Implementação de um sistema de doações para streamers, permitindo que a audiência contribua para que o streamer reaja a conteúdos específicos.

- **Navegação e Busca:** Facilita a descoberta de novos títulos através de funcionalidades de busca e paginação.

- **Design Responsivo:** Interface adaptável a diferentes tamanhos de tela.

## Tecnologias Utilizadas

O projeto é construído com as seguintes tecnologias:

- **Next.js 16.2.6:** Framework React para aplicações web com renderização no servidor e geração de sites estáticos.

- **React 19.2.4 & React DOM 19.2.4:** Biblioteca JavaScript para construção de interfaces de usuário.

- **TypeScript 5:** Superset do JavaScript que adiciona tipagem estática.

- **Tailwind CSS 4:** Framework CSS utilitário para estilização rápida e responsiva.

- **Outras Bibliotecas de UI:**
  - `class-variance-authority`
  - `clsx`
  - `embla-carousel-react`
  - `lucide-react`
  - `radix-ui`
  - `shadcn`
  - `tailwind-merge`
  - `tw-animate-css`

## Como Rodar o Projeto Localmente

Para configurar e rodar o projeto em sua máquina local, siga os passos abaixo:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/gaby0832/vanne-movies-website.git
   cd vanne-movies-website
   ```

1. **Instale as dependências:**

   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   # ou
   bun install
   ```

1. **Configure as variáveis de ambiente:**

   Crie um arquivo `.env.local` na raiz do projeto e adicione as variáveis de ambiente necessárias. (Ex: `TMDB_API_KEY=sua_chave_api_tmdb` )

1. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   # ou
   bun dev
   ```

   O aplicativo estará disponível em `http://localhost:3000`.

## Estrutura do Projeto

A estrutura principal do projeto segue a convenção do Next.js App Router:

```
vanne-movies-website/
├── app/                  # Rotas da aplicação, incluindo API e páginas
│   ├── api/              # Endpoints da API (movie, movieList, movieTranding )
│   ├── components/       # Componentes específicos de página
│   ├── movie/[id]/       # Página de detalhes de filmes
│   ├── search/           # Página de busca
│   ├── tmdb/             # Lógica de integração com TMDB
│   ├── tv/[id]/          # Página de detalhes de séries de TV
│   ├── globals.css       # Estilos globais
│   ├── layout.tsx        # Layout principal da aplicação
│   └── page.tsx          # Página inicial
├── components/ui/        # Componentes de UI reutilizáveis (botões, paginação, etc.)
├── lib/                  # Funções utilitárias e helpers
├── public/               # Arquivos estáticos (imagens, etc.)
├── .gitignore            # Arquivos e diretórios a serem ignorados pelo Git
├── package.json          # Metadados do projeto e dependências
├── tsconfig.json         # Configurações do TypeScript
└── ...                   # Outros arquivos de configuração (eslint, postcss, next.config)
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests para melhorias, correção de bugs ou novas funcionalidades.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## Contato

Para dúvidas ou sugestões, entre em contato com o mantenedor do repositório: [gaby0832](https://github.com/gaby0832)
