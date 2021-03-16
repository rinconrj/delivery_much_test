import express from 'express'

import * as controller from './productController'

export default express
  .Router()
  .get('/product/:id', controller.getProductById)
  .get('/product/', controller.getProducts)
  .post('/product/import', controller.importProducts)
  .post('/product/', controller.addProduct)
  .put('/product/:id', controller.updateProduct)
  .delete('/product/:id', controller.deleteProduct)
