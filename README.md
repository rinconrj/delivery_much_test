# DeliveryMuch Backend Challenge

Este é um pequeno servidor, feito para administrar produtos e ordenes de um mercado, com um **CRUD** feito para adicionar produtos um por um ou importando um CSV.
O control de estoque pode ser controlado na API ou via RabbitMQ

## START

Clonar o repositorio

```
git clone https://github.com/rinconrj/delivery_much_test.git
```

Abrir um terminal para iniciar o banco de dados em mongo e o rabbitmq dentro da pasta raiz

```
yarn deploy:docker
```

Depois abir outro terminal para iniciar o servidor

```
yarn && yarn dev
```

Para testes

```
yarn test
```

## CRUD Produtos

Com o servidor ativo pode começar incluindo produtos em formato CSV pode ser via insomnia ou qualquer fontend

```
POST
--url https://localhost:3500/product/import
--header 'Content-Type: multipart/form-data;
--form 'file=products.csv'
```

Products enpoints:

Add new Product

````

POST /product

Body:

> {
> "name": "Letucce"
> "quantity": 2
> "price": 1.99
> }

Reponse:

> {
> "\_id":"ASDJK34984HJF82H",
> "name": "Letucce",
> "quantity": 2,
> "price": 1.99
> }

```

Fetch all Products

```

GET /product

Response:

> [{
>
> > "\_id":"ASDJK34984HJF82H",
> > "name": "Letucce",
> > "quantity": 2,
> > "price": 1.99
> > }]

```

Fetch Product by ID

```

GET /product/:id

Response:

> {
> "\_id":"ASDJK34984HJF82H",
> "name": "Letucce",
> "quantity": 2,
> "price": 1.99
> }

```

Update Product by ID

```

PUT /product/:id

Body:

> {
> "quantity": 4,
> "price": 3
> }

Response:

> {
> "\_id":"ASDJK34984HJF82H",
> "name": "Letucce",
> "quantity": 4,
> "price": 3
> }

```

Delete Product by ID

```

DELETE /product/:id

Response:

> {
> "\_id":"ASDJK34984HJF82H",
> "name": "Letucce",
> "quantity": 4,
> "price": 3
> }

```


## CRUD Order

Depois de carregar os productos no banco, agora pode criar as ordens

Order enpoints:

Add new Order

````
