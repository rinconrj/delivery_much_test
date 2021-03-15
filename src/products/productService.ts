import Product from '../models/product'

import { IProduct } from '../types/interfaces'
import {
  parseAndVerifyCsv,
  verifyProduct,
  addProduct,
  sustractProduct,
  rabbitMComsumer,
} from './productHelper'

if (process.env.NODE_ENV !== 'TEST')
  rabbitMComsumer(process.env.RABBITMQ_URL, addProduct, sustractProduct)

export async function createProduct(productObj: IProduct): Promise<IProduct> {
  verifyProduct(productObj)

  const newProdcut = await Product.create(productObj)
  return newProdcut.toObject()
}

export async function getProductById(_id: string) {
  if (!_id) throw new Error('missing_params')
  const product = await Product.findOne({ _id }).lean()
  if (!product) throw new Error('not_found')
  return product
}

export async function fetchAllProducts(skip?: string, limit?: string) {
  return Product.find({})
    .skip(parseInt(skip) | 0)
    .limit(parseInt(limit) | 100)
    .lean()
}

export async function updateProduct(id, body) {
  if (!id) throw new Error('missing_params')

  const updatedProdcut = await Product.findOneAndUpdate(
    { _id: id },
    { ...body },
    { new: true }
  ).lean()

  return updatedProdcut
}

export async function deleteProduct(id) {
  if (!id) throw new Error('missing_params')
  const deleted = await Product.findOneAndDelete({ _id: id })
  return deleted
}

export async function importProductsFromCsv(file) {
  const csvObj = await parseAndVerifyCsv(file)

  await Promise.allSettled(csvObj.map(createProduct))

  return { message: 'import done' }
}
