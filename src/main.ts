require('dotenv').config()
import { connect } from './config/db'
import app from './config/app'
import logger from './config/logger'

connect()

app.listen(process.env.PORT, async () => {
  try {
    const router = require('./router').default
    router()
    logger.info(`Server Running on ${process.env.PORT}`)
  } catch (error) {
    logger.error(error.message)
  }
})
