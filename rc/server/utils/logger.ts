import { createLogger, transports, format } from 'winston'
import path from 'node:path'

export const logger = createLogger({
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
