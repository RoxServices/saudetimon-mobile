<img
  src="./src/images/logo.png"
  width="500"
  style="display: block; margin-left: auto; margin-right: auto;"
/>

# Saúde Timon 24h - Mobile App

## Sobre o Projeto
O aplicativo Saúde Timon 24h permite aos usuários realizar o cadastro para a
vacinação contra a Covid-19 na cidade de Timon-MA.

Dentre as funcionalidades estão o cadastro para a vacinação por grupos, checagem
do status do cadastro, consulta a locais de vacinação, entre outros.

O projeto atual é uma aplicação mobile desenvolvida para o público realizar a
interação necessária com o sistema.

Demonstração: https://play.google.com/store/apps/details?id=com.accesssollutions.saudetimon24h

## Tecnologias e Estrutura
O projeto foi escrito utilizando as seguintes tecnologias:

* Linguagem: [Typescript](https://www.typescriptlang.org/)
* Framework: [React Native](https://reactnative.dev/) (inicializado com o [Expo](https://expo.dev/))

O projeto foi escrito utilizando o padrão de hooks do react (React Hooks)
utilizando componentes funcionais. Dentre as pastas do projeto, se destacam:

* src: Pasta principal que contém todos os arquivos importantes do projeto.
* src/components: Pasta onde se localizam componentes reutilizáveis.
* src/contexts: Pasta que contém algumas APIs de contexto.
* src/pages: Pasta que contém as telas da aplicação, definidas no arquivo
  routes.tsx.
* src/services: Pasta que contém os providers utilizados no sistema.
* src/utils: Pasta que contém funções utilitárias.
* typescript: Pasta que contém as tipagens e interfaces utilizadas pelo
  typescript.

## Como executar o projeto
### Desenvolvimento
1. Instalar as dependências.
```bash
$ npm i

$ yarn
```

2. Copiar o arquivo .env.example nomeando como .env e setar as variáveis de
  ambiente necessárias.

3. Iniciar o projeto
```bash
$ npm run start

$ yarn start
```

4. Abrir o projeto em um emulador ou no dispositivo utilizando o cli do expo
  ou a interface web.

4. Após isso o projeto estará pronto para ser utilizado em desenvolvimento.

### Produção
1. Instalar as dependências.
```bash
$ npm i

$ yarn
```

2. Copiar o arquivo .env.example nomeando como .env e setar as variáveis de
  ambiente necessárias.

3. Gerar a build de produção de acordo com a plataforma requisitada
```bash
$ expo build:ios | expo build:android | expo build:web
```

4. Seguir as instruções de build da cli do expo.

5. Após isso serão gerados arquivos para envio para lojas de aplicativos ou
  uma web-build no caso de um pwa.