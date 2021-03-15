import * as dbHandler from './dbHandler'
import { addOrder, fetchAllOrders, getOrderById } from '../orders/orderService'
import { createProduct } from '../products/productService'

import { orderObject, productsArray } from './objects'

beforeAll(async () => await dbHandler.connect())

afterEach(async () => await dbHandler.clearDatabase())

afterAll(async () => await dbHandler.closeDatabase())

describe('orderService', () => {
  describe('Order create', () => {
    it('should be created correctly', async () => {
      let total = 0
      for (const productObj of productsArray) {
        const product = await createProduct(productObj)
        total = product.price * product.quantity + total
      }
      expect(async () => await addOrder(orderObject)).not.toThrow()
      expect(async () => await addOrder([])).rejects.toThrow()

      const order = await addOrder(orderObject)
      expect(order.total).toEqual(total)
    })

    it('should not create an order with empty array', async () => {
      expect(async () => await addOrder([])).rejects.toThrow()
    })
  })

  describe('Order fetch', () => {
    it('Should fetch an array of orders', async () => {
      for (const productObj of productsArray) {
        await createProduct(productObj)
      }
      const order = await addOrder(orderObject)
      expect(async () => await fetchAllOrders()).not.toThrow()
      const orders = await fetchAllOrders()
      expect(orders).toContainEqual(order)
    })

    it('Should fetch an order by using id', async () => {
      for (const productObj of productsArray) {
        await createProduct(productObj)
      }
      const order = await addOrder(orderObject)
      expect(async () => await getOrderById(order.id)).not.toThrow()
      const orderDb = await getOrderById(order.id)
      expect(orderDb).toEqual(order)
    })

    it('Should throw an error if missing id', async () => {
      for (const productObj of productsArray) {
        await createProduct(productObj)
      }
      const order = await addOrder(orderObject)
      expect(async () => await getOrderById('')).rejects.toThrow()
    })
  })
})
