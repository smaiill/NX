import DB from 's@db/db'

globalThis.exports('useDB', () => {
  return {
    FindAll: DB.findAll.bind(DB),
    Execute: DB.exec.bind(DB),
  }
})
