import path from 'node:path'
import { createLogger, format, transports } from 'winston'

const LG = createLogger({
  transports: [
    new transports.File({
      dirname: `${path.resolve(GetResourcePath(GetCurrentResourceName()))}`,
      filename: 'nx.logs.log',
      level: 'silly',
      format: format.combine(
        format.errors({ stack: true }),
        format.timestamp({
          format: 'MM-DD-YYYY HH:mm',
        }),
        format.json()
      ),
    }),
    new transports.Console({
      format: format.combine(
        format.timestamp({
          format: 'MM-DD-YYYY HH:mm',
        }),
        format.colorize({ all: true }),
        format.label({
          label: 'NX',
        }),
        format.printf(
          (log: any): string =>
            `[${log.label}] | ${log.timestamp} [${log.level}]: ${log.message}`
        )
      ),
    }),
  ],
})

export { LG }
