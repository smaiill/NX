const PlayerQuerys = {
  UPDATE:
    'UPDATE nx_users SET charinfo = ?, inventory = ?, accounts = ?, position = ?, permissions = ?, skin = ? WHERE identifier = ?',
  CREATE:
    'INSERT INTO nx_users (identifier, charinfo, uid, accounts) VALUES (?, ?, ?, ?)',
  SELECT_WITH_IDENTIFIER: 'SELECT * FROM nx_users WHERE identifier = ? ',
}

const BanQuerys = {
  CREATE:
    'INSERT INTO nx_bans (license, bannedBy, identifiers, reason, id, expire) VALUES (?, ?, ?, ?, ?, ?)',
  DELETE: 'DELETE FROM nx_bans WHERE id = ?',
  FETCH_ALL: 'SELECT * FROM nx_bans',
}

const JobQuerys = {
  FETCH_ALL: 'SELECT * FROM nx_jobs',
}

export const Querys = {
  Player: PlayerQuerys,
  Ban: BanQuerys,
  Job: JobQuerys,
} as const
