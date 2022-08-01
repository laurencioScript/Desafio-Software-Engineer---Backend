
# Desafio Software Engineer - Backend

## Stack utilizada

**Back-end:** 
- Node: 12.22.8
- Express: 4.18.1
- Puppeteer: 15.5.0


## Como rodar o projeto

- Adicionar um arquivo `.env` com as variaveis de ambiente.
```bash
  PORT=4000
  DELAY=7000
  PRODUCTION=true
```
- Com o nodeJs instalado em sua maquina rode os seguintes comandos.
```bash
  npm install
  npm run start
```

    
## Documentação da API

#### Rota para identificar se o servidor esta operando.

```http
  GET /ping
```


#### Retorna o número de benefício encontrado.

```http
  GET /v1/benefits
```
**Request**

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `cpf` | `string` | **Obrigatório**. CPF do usuário |
| `user` | `string` | **Obrigatório**. Acesso do usuário |
| `password` | `string` | **Obrigatório**. Senha de acesso |

**Response**

| Parâmetro   | Tipo       |
| :---------- | :--------- |
| `giftNumber` | `string` | 

