import mysql from 'mysql2/promise'
import { logger } from '../utils/logger'

export const generateConnectionPool = (): mysql.Pool | undefined => {
  try {
    return mysql.createPool({
      host: 'localhost',
      user: 'root',
      database: 'naf',
      connectTimeout: 60000,
    })
  } catch (e: any) {
    logger.error(`Error while creating pool connection: ${e}`)
  }
}

export const pool = generateConnectionPool()
