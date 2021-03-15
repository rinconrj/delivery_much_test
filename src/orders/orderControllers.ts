import * as service from './orderService'
import { Response, Request } from 'express'
import error from '../config/error'

export async function getOrderById(req: Request, res: Response) {
  const { id } = req.params
  return service
    .getOrderById(id)
    .then((data) => res.json(data))
    .catch((e) => error(e, res))
}

export async function getOrders(req: Request, res: Response): Promise<Response> {
  return service
    .fetchAllOrders()
    .then((data) => res.json(data))
    .catch((e) => error(e, res))
}

export async function addOrder(req: Request, res: Response) {
  const { body } = req
  return service
    .addOrder(body)
    .then((data) => res.json(data))
    .catch((e) => error(e, res))
}
