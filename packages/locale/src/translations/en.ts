import { IKeys, KEYS } from '../consts/keys'

const en = {
  [KEYS.DB_CONNECTED]:
    'DB connected with success, execution time: [{{ duration }} ms]',
  [KEYS.DB_CONNECTION_ERROR]: 'Error while connecting the DB: {{error}}',
} as Record<IKeys, string>

export default en
