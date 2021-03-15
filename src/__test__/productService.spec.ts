import * as dbHandler from './dbHandler'
import {
  createProduct,
  getProductById,
  fetchAllProducts,
  updateProduct,
  deleteProduct,
} from '../products/productService'

import { productObj, wrongProductObj, productsArray } from './objects'

beforeAll(async () => await dbHandler.connect())

afterEach(async () => await dbHandler.clearDatabase())

afterAll(async () => await dbHandler.closeDatabase())

describe('productService', () => {
  describe('Product create', () => {
    it('should created correctly', async () => {
      expect(async () => await createProduct(productObj)).not.toThrow()

      const product = await createProduct(productObj)
      expect(product).toMatchObject(productObj)
    })

    it('should not create without name or quantity', async () => {
      expect(async () => await createProduct(wrongProductObj)).rejects.toThrow()
    })
  })

  describe('Product fetch', () => {
    it('should fetch all database products', async () => {
      for (const product of productsArray) {
        await createProduct(product)
      }
      const allProducts = await fetchAllProducts()
      expect(allProducts).toHaveLength(productsArray.length)
    })

    it('should fetch a product by _id', async () => {
      const product = await createProduct(productObj)
      const fetchedProduct = await getProductById(product._id)
      expect(product).toMatchObject(fetchedProduct)
    })

    it('should throw a error with a wrong _id or missing _id', async () => {
      expect(async () => await getProductById('123123')).rejects.toThrow()
      expect(async () => await getProductById('')).rejects.toThrow()
    })
  })

  describe('Product modify', () => {
    it('should be updated', async () => {
      const product = await createProduct(productObj)
      const updatedQuantity = 2
      expect(
        async () => await updateProduct(product._id, { quantity: updatedQuantity })
      ).not.toThrow()
      expect(async () => await updateProduct('', { quantity: updatedQuantity })).rejects.toThrow()

      const updatedProduct = await updateProduct(product._id, { quantity: updatedQuantity })
      expect(updatedProduct.quantity).toEqual(updatedQuantity)
    })

    it('should throw an error with no _id', async () => {
      const product = await createProduct(productObj)
      const updatedQuantity = 2
      expect(async () => await updateProduct('', { quantity: updatedQuantity })).rejects.toThrow()
    })

    it('can be deleted', async () => {
      const toDeleteproduct = await createProduct(productObj)
      expect(async () => await deleteProduct(toDeleteproduct._id)).not.toThrow()
      expect(async () => await getProductById(toDeleteproduct._id)).not.toEqual(toDeleteproduct)
    })
  })
})
