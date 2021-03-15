import express from 'express'

import * as controller from './orderControllers'

export default express
  .Router()
  .get('/order/:id', controller.getOrderById)
  .get('/order/', controller.getOrders)
  .post('/order/', controller.addOrder)
