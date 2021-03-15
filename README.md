# DeliveryMuch Backend Challenge

Este é um pequeno servidor, feito para administrar produtos e ordenes de um mercado, com um **CRUD** feito para adicionar produtos um por um ou importando um CSV.
O control de estoque pode ser controlado na API ou via RabbitMQ

## START

Abrir um terminal para iniciar o banco de dados em mongo e o rabbitmq dentro da raiz de pasta
```
yarn deploy:docker
```


Depois abir outro terminal para iniciar o servidor
```
yarn dev
```
Para testes
```
yarn test
```

## CRUD Produtos

Com o servidor ativo pode começar incluindo produtos em formato CSV pode ser via insomnia ou qualquer fontend

POST
  --url https://localhost:3500/product/import 
  --header 'Content-Type: multipart/form-data;
  --form 'file=products.csv'

Enpoints:

POST

```

# GET /order
$ curl https://localhost:3000/product/

> {
>	"name": "Letucce"
>	"quantity":  2
>	"price": 1.99
> }
```

GET

```
/v1/accounts/:id
```
