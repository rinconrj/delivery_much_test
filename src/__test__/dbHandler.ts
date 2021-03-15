import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongod

export const connect = async () => {
  mongod = new MongoMemoryServer()
  const uri = await mongod.getUri(true)

  const mongooseOpts = {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    useFindAndModify: false,
    poolSize: 10,
  }
  await mongoose.connect(uri, mongooseOpts).catch((err) => {
    console.error('Database connection error: ' + err.message)
  })
}

export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongod.stop()
}

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections
  for (const key in collections) {
    const collection = collections[key]
    const numbers = await collection.countDocuments({})
    if (numbers) await collection.deleteMany({})
  }
}
