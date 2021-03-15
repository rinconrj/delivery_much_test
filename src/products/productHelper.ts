import Product from '../models/product'
import logger from '../config/logger'

import { IProduct } from 'src/types/interfaces'

import amqp from 'amqplib'
import csv from 'csvtojson'
import fs from 'fs'
import path from 'path'

export async function rabbitMComsumer(url: string, sustractProduct, addProduct): Promise<void> {
  const channel = await amqp
    .connect(url)
    .then((conn) => conn.createChannel())
    .catch(logger.warn)

  channel.assertExchange('stock', 'direct')

  const q = await channel.assertQueue('')

  channel.bindQueue(q.queue, 'stock', 'incremented')
  channel.bindQueue(q.queue, 'stock', 'decremented')
  channel.consume(q.queue, async (msg) => {
    const [key, product] = [
      msg?.fields?.routingKey?.toString(),
      msg?.content.toString().replace(/"/g, ''),
    ]
    if (key === 'incremented') await addProduct(product)

    if (key === 'decremented') await sustractProduct(product)
  })
}

export async function addProduct(productName: string): Promise<void> {
  const product = await Product.findOne({ name: productName })
  if (!product) {
    logger.warn(productName + 'product not registered')
    return
  }
  product.quantity++
  await product.save()
}

export async function sustractProduct(productName: string): Promise<void> {
  const product = await Product.findOne({ name: productName, quantity: { $gte: 1 } })
  if (!product) {
    logger.warn(productName + 'product out of stock')
    return
  }

  product.quantity--

  await product.save()
}

export async function verifyProductAvalability(product: IProduct): Promise<IProduct> {
  if (!product.name) throw new Error('invalid_name')

  const dbProduct = await Product.findOne({
    name: product.name,
    quantity: { $gte: product?.quantity },
  }).lean()

  if (!dbProduct) throw new Error('invalid_name')

  return dbProduct
}

export async function updateProductAvalability(product: IProduct): Promise<IProduct> {
  if (!product.name) throw new Error('invalid_name')

  const updated = await Product.findOneAndUpdate(
    {
      name: product.name,
    },
    {
      $inc: { quantity: -product.quantity },
    },
    {
      new: true,
    }
  )
  return updated
}

export function verifyProduct(product) {
  if (!product.name || !product.price) throw new Error('missing_params')
  return
}

export async function parseAndVerifyCsv(file) {
  const rawFile = fs.readFileSync(path.resolve(file.tempFilePath))

  const jsonCsv = await csv().fromString(rawFile.toString())

  return filterProductsList(jsonCsv)
}

export function filterProductsList(jsonCsv) {
  const verified = jsonCsv.reduce(
    (acc, curr) => (curr.name && curr.price ? [...acc, curr] : acc),
    []
  )

  return verified
}
