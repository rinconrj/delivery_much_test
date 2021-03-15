import mongoose from 'mongoose'
import logger from './logger'

const url = `mongodb://${process.env.MONGOUSER}:${process.env.MONGOPASS}@127.0.0.1:27017`

const mongoConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  keepAlive: true,
  keepAliveInitialDelay: 300000,
}
export async function connect() {
  mongoose.connect(url, mongoConfig, (err) => {
    if (err) throw new Error(err.message)
    logger.info(`Connected ${process.env.MONGOUSER}@127.0.0.1:27017`)
  })

  let resolve: (value: unknown) => void

  const _promise = new Promise((_resolve) => (resolve = _resolve))

  return _promise
}
