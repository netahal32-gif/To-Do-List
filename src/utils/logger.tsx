import { pino } from 'pino'

export const logger = pino({
  level: 'info',
  transport: {
    options: {
      colorize: true,
      ignore: 'pid,hostname',
      translateTime: 'SYS:HH:MM:ss Z',
    },
    target: 'pino-pretty',
  },
})
