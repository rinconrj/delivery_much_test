import Express from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import morgan from 'morgan'
import logger from './logger'

const app = Express()

app
  .use(helmet())
  .use((req, _, next) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req.getUrl = () => req.protocol + '://' + req.get('host') + req.originalUrl
    return next()
  })
  .use(
    morgan('combined', {
      stream: {
        write: (info) => logger.info(logger.parse(info)),
      },
      skip: (req) => req.method === 'OPTIONS',
    })
  )
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
    })
  )
  .set('x-powered-by', 'PHP/7.3.9')

export default app
