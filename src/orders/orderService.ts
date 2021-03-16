import Order from '../models/order'
import Id from '../models/id'

import { IProduct, IOrder, IID } from 'src/types/interfaces'

import { verifyProductAvalability, updateProductAvalability } from '../products/productHelper'

export async function addOrder(products: IProduct[]): Promise<IOrder> {
  if (!products.length) throw new Error('missing_items')
  const populatedProduct = await Promise.all(products.map(verifyProductAvalability))

  const orderObj = {
    id: await getNewId(),
    products: populatedProduct,
    total: getTotalPrice(populatedProduct),
  }

  const newOrder = await Order.create(orderObj).then((data) => data.toObject())

  await Promise.all(populatedProduct.map(updateProductAvalability))
  delete newOrder._id

  return newOrder
}

async function getNewId(): Promise<number> {
  const newId: IID = await Id.findOneAndUpdate(
    {},
    { $inc: { id: 1 } as any },
    { new: true, upsert: true }
  ).lean()

  return newId.id
}

export async function fetchAllOrders(): Promise<IOrder[]> {
  const orders = await Order.find({}, '-_id').lean()

  return orders
}

export async function getOrderById(id) {
  if (!id) throw new Error('missing_params')

  return Order.findOne({ id }, '-_id').lean()
}

function getTotalPrice(productsArray: IProduct[]): number {
  const total = productsArray.reduce(
    (acc, curr) => (curr.price && curr.quantity ? acc + curr.price * curr.quantity : acc),
    0
  )

  return total
}
