import * as dbHandler from './dbHandler'
import {
  addProduct,
  sustractProduct,
  verifyProductAvalability,
  updateProductAvalability,
  verifyProduct,
} from '../products/productHelper'
import { createProduct, getProductById } from '../products/productService'

import { productObj, wrongProductObj, productsArray } from './objects'

beforeAll(async () => await dbHandler.connect())

afterEach(async () => await dbHandler.clearDatabase())

afterAll(async () => await dbHandler.closeDatabase())

describe('productHelper', () => {
  describe('addProduct', () => {
    it('Should increase the product quantity', async () => {
      const product = await createProduct(productObj)
      await addProduct(product.name)
      const updatedProduct = await getProductById(product._id)
      expect(updatedProduct.quantity).toStrictEqual(product.quantity + 1)
    })
  })

  describe('sustractProduct', () => {
    it('Should decrease the product quantity', async () => {
      const product = await createProduct(productObj)
      await sustractProduct(product.name)
      const updatedProduct = await getProductById(product._id)
      expect(updatedProduct.quantity).toStrictEqual(product.quantity - 1)
    })
  })

  describe('verifyProductAvalability', () => {
    it('Should verify avalability of the product', async () => {
      const askedProduct = await createProduct(productObj)
      expect(async () => await verifyProductAvalability(askedProduct)).not.toThrow()
    })
    it('Should throw an error without product', async () => {
      expect(async () => await verifyProductAvalability({} as any)).rejects.toThrow()
    })
  })

  describe('updateProductAvalability', () => {
    it('Should update the quantity of the product', async () => {
      const product = await createProduct(productObj)
      await updateProductAvalability({ name: productObj.name, quantity: 2 })
      const updatedProduct = await getProductById(product._id)
      expect(productObj.quantity - 2).toStrictEqual(updatedProduct.quantity)
    })

    it('Should throw an error without product', async () => {
      expect(
        async () => await updateProductAvalability({ name: '', quantity: 5 })
      ).rejects.toThrow()
    })
  })

  describe('verifyProduct', () => {
    it('Should void if the product object is rigth', async () => {
      verifyProduct(productObj)
      expect(verifyProduct(productObj)).toBe(undefined)
    })

    it('Should throw an error if the product object is missing name or price', async () => {
      expect(() => verifyProduct(wrongProductObj)).toThrow()
    })
  })
})
