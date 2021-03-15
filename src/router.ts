import express from 'express'
import app from './config/app'

import orderRoutes from './orders/orderRoutes'
import productRoutes from './products/productRoutes'

export default function router(): void {
  const router = express.Router()
  router.use(orderRoutes)
  router.use(productRoutes)
  app.use('/', router)
}
