export interface IProduct {
  _id?: any
  name: string
  quantity: number
  price?: number
}

export interface IOrder {
  _id?: any
  id: IID
  products: IProduct[]
  total: number
}
export interface IID {
  _id?: any
  id: number
}
