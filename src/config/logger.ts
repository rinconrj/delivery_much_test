import winston, { format } from 'winston'
import 'colors'

const { combine } = format

const consoleConfig = {
  level: 'info',
  handleExceptions: true,
  format: combine(winston.format.colorize(), winston.format.simple()),
}

const loggerTransports = new winston.transports.Console(consoleConfig)

const logger = winston.createLogger({
  transports: [loggerTransports],
  exitOnError: false,
})

const fullLogger = Object.assign(logger, { parse: (message) => message.trim() })

export default fullLogger
