import { Schema, model, Document } from 'mongoose'
import { IID } from '../types/interfaces'

const idSchema = new Schema<IID & Document>(
  {
    id: { type: Number, unique: true },
  },
  { versionKey: false }
)

export default model<IID & Document>('Id', idSchema)
