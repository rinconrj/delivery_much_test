import { Schema, model, Document } from 'mongoose'
import { IProduct } from '../types/interfaces'

const productSchema = new Schema<IProduct & Document>(
  {
    name: String,
    price: Number,
    quantity: Number,
  },
  { versionKey: false }
)

export default model<IProduct & Document>('Product', productSchema)
