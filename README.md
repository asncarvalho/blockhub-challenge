# Blockhub Challenge API


>Status : Concluído. ✔️

### Um api contendo CRUD de projetos e colaboradores, utilizada para gestão de projetos.

## Os campos do modelo principal (Usuário) são:

+ username
+ password
+ ativo

## Tecnologias Usadas

<table>
    <tr>
        <td>NodeJS</td>
        <td>NestJS</td>
        <td>Yarn</td>
        <td>MongoDB</td>
        <td>dotenv</td>
        <td>Swagger</td>
        <td>Swagger-ui-express</td>
    </tr>
    <tr>
        <td>16.13.1</td>
        <td>^8.0.0</td>
        <td>1.22.17</td>
        <td>5.1</td>
        <td>^16.0.0</td>
        <td>^5.2.0</td>
        <td>^4.3.0</td>
    </tr>
</table>

Como rodar a aplicação?

1) na linha de comando: yarn install ou npm install
2) configurar as variáveis de desenvolvimento no .env
  - MONGODBCONN = 'mongodb+srv://devasnc:14d4rLqRpjMNouJc@cluster0.vykvv.mongodb.net/test' -> conexão com o mongodb, pode conectar também utilizando um cluster da sua escolha.
  - APP_SECRET = 'e456d7ca-7547-4fdb-b91f-cf0b6715d632' 
    (essa é a chave utilizada para autenticação via JWT, é uma informação sensível, ela não deveria estar aqui, mas está por fins didáticos)
3) rode o comando : yarn start ou nest start ou npm run start
   

Como utilizar:

1) Primeiro crie um usuário (/users), unica rota que não precisa estar autenticado.
2) Depois faça a autenticação através da rota "/auth/login"
3) Depois da autenticação, o usuário obtera acesso a todos os endpoints.

## Mais instruções na documentação : http://localhost:3000/swagger


