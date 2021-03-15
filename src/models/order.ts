import { Schema, model, Document } from 'mongoose'
import { IOrder } from '../types/interfaces'

const orderSchema = new Schema<IOrder & Document>(
  {
    id: { type: Number, unique: true },
    products: [
      {
        name: { type: String, require: true },
        quantity: { type: Number, require: true },
        price: { type: Number, require: true },
      },
    ],
    total: { type: Number, required: true },
  },
  { versionKey: false }
)

export default model<IOrder & Document>('Order', orderSchema)
