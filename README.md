# Desafio Front-end - Card Marketplace

## Tabelas de conteúdos

- [Overview](#overview)
  - [Links](#links)
  - [Getting started](#getting-started)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Continued Development](#continued-development)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

O desafio consiste em esenvolver o front-end de um simples marketplace para troca de cartas:


#### Funcionalidades

- [x] Usuário deve poder se registrar e fazer login.
- [x] O usuário pode adicionar cartas a sua própria conta.
- [x] O usuário pode criar uma solicitação de troca.
- [x] Ele deve escolher quais cartas da sua conta que pretende oferecer.
- [x] Deve poder escolher entre todas cartas registradas quais ele quer receber.
- [x] O usuário deve poder deletar solicitações de troca que criou.
- [x] Todos usuários e visitantes tem acesso a pagina inicial de marketplace mostrando as solicitações de troca abertas

### Links

- [Remote repository](https://github.com/trelcray/cards-marketplace-trelcray)

- [Live preview](https://cards-marketplace-trelcray.vercel.app)

### Getting started

Você pode utilizar a aplicação disponível na URL de _live preview_ acima. Porém,
caso queira construí-la em sua máquina:

#### Prerequisites

Certifique-se de que sua máquina possui Node 19+ instalado e o gerenciador de
pacotes `npm`.

Certifique-se de ter instalado a extensão do ESlint.

Certifique-se de criar um .env.local seguindo o exemplo do .env.example com as informações corretas.

#### Installation

Clone o repositório do projeto para sua máquina.

Using HTTPS:

```bash
https://github.com/trelcray/cards-marketplace-trelcray.git
```

Using GitHub CLI:

```bash
gh repo clone trelcray/cards-marketplace-trelcray
```

Navegue para o diretório recém-baixado:

```bash
cd cards-marketplace-trelcray
```

Instale as dependências do projeto utilizando `npm`:

```bash
npm install
```

#### Development

Para executar o projeto em modo de desenvolvimento, execute o comando:

```bash
npm run dev
```

Isso irá iniciar o servidor de desenvolvimento no endereço
`http://localhost:3000`. Abra seu navegador e cole o endereço para visualizar a
aplicação.

#### Building for Production

Para construir o projeto para produção, execute o comando:

```bash
npm run build
```

Isso irá gerar uma versão otimizada e minificada da aplicação na pasta `dist`.

#### Running in Production Mode

Após a construção do projeto, você pode iniciar um servidor em modo de produção
executando o comando:

```bash
npm run start
```

Isso irá iniciar o servidor de produção no mesmo endereço
`http://localhost:3000`. Abra seu navegador e cole o endereço para visualizar a
aplicação otimizada.

## My process

### Built with

#### Technologies, libraries and tools

- React.js
- NextJS
- TypeScript
- Tailwind CSS
- Shadcn UI
- Prettier
- ESlint
- Lucide-React
- React-Hook-Form
- Zod
- Date-fns

#### Techniques, concepts and more

- Mobile-first workflow
- Semantic HTML5 markup
- Flexbox / Grid
- SSR / CSR
- Hosted on Vercel

### Continued development

1. Corrigir a paginação das minhas trocas.
2. Implementar novos testes unitários.
3. Implementar testes E2E com playwright



## Author

- GitHub - [trelcray](https://github.com/trelcray)

- LinkedIn - [Thalis Zambarda](https://www.linkedin.com/in/thalis-zambarda/)

## Acknowledgments

Agradeço a [INMETA](https://www.inmeta.com.br/) pela oportunidade de
demonstrar minhas habilidades na prática. Estou entusiasmado em poder mostrar o
que sou capaz de fazer e espero que essa experiência possa contribuir para o
processo de seleção.
