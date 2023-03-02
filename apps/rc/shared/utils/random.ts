import { randomUUID } from 'node:crypto'

const UUID_REPLACE = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
const UUID_TYPES = {
  SMALL: 8,
  MEDIUM: 18,
  LARGE: 32,
}

const uuid = () => randomUUID()

export { uuid }
