## Para rodar esta aplicação no localhost:

### FRONTEND

- Requerido
- Clone o projeto e inicialize com "yarn dev:next"

### BACKEND

- Não requerido
- Não é necessário clonar e rodar um backend pois esta arquitetura combina Express.js e Next.js num único projeto
- Foi realizada uma tentativa com Docker + Node + Postgres a fim de rodar o Strapi mas por alguma razão não foi possível clonar o banco dados pra nuvem

### DATABASE

- Requerido
- Este projeto utiliza o MySQL
- É necessário baixar e instalar qualquer versão manualmente
- As variáveis de conexão necessárias encontram-se no arquivo ".env.dev"

### DOCKER

- Não requerido
- Foi realizada uma tentativa de embarcar o front e um banco de dados Postgres em um container. Mas por razões práticas e de desempenho uma instalação manual do Mysql foi utilizada
