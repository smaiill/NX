export const KEYS = {
  DB_CONNECTED: 'DB_CONNECTED',
  DB_CONNECTION_ERROR: 'DB_CONNECTION_ERROR',
} as const

export type IKeys = keyof typeof KEYS
