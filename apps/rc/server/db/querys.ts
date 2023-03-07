const PlayerQuerys = {
  UPDATE:
    'UPDATE nx_users SET charinfo = ?, inventory = ?, accounts = ?, position = ?, group = ?, skin = ? WHERE identifier = ?',
  CREATE:
    'INSERT INTO nx_users (identifier, charinfo, uid, accounts) VALUES (?, ?, ?, ?)',
  SELECT_WITH_IDENTIFIER: 'SELECT * FROM nx_users WHERE identifier = ? ',
} as const

const BanQuerys = {
  CREATE:
    'INSERT INTO nx_bans (license, bannedBy, identifiers, reason, id, expire) VALUES (?, ?, ?, ?, ?, ?)',
  DELETE: 'DELETE FROM nx_bans WHERE id = ?',
  FETCH_ALL: 'SELECT * FROM nx_bans',
} as const

const JobQuerys = {
  FETCH_ALL: 'SELECT * FROM nx_jobs',
} as const

const ItemQuerys = {
  FETCH_ALL: 'SELECT * FROM nx_items',
  CREATE:
    'INSERT INTO nx_items (name, label, weight, type, props, _unique, maxInSlot, data) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
} as const

export const Querys = {
  Player: PlayerQuerys,
  Ban: BanQuerys,
  Job: JobQuerys,
  Item: ItemQuerys,
} as const
