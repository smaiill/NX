import { config } from '@shared/load.file'
import mysql from 'mysql2/promise'
import { DBLogger } from './logger'

export const generateConnectionPool = (): mysql.Pool | undefined => {
  try {
    return mysql.createPool({
      host: config.database.host,
      user: config.database.user,
      password: config.database.password,
      database: config.database.database,
      connectTimeout: 60000,
    })
  } catch (e) {
    DBLogger.error(`Error while creating pool connection: ${e}`)
  }
}

export const pool = generateConnectionPool()
