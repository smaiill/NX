export enum DBQueries {
  CRAETE_PLAYER = 'INSERT INTO nx_users (identifier, charinfo, uid) VALUES (?, ?, ?)',
  SELECT_PLAYER_W_IDENTIFIER = 'SELECT * FROM nx_users WHERE identifier = ? ',
  UPDATE_PLAYER = 'UPDATE nx_users SET charinfo = ?, inventory = ?, accounts = ?, position = ?, permissions = ? WHERE identifier = ?',
}
