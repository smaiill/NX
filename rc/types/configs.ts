export interface ConfigT {
  database: {
    host: string
    user: string
    password: string
    database: string
  }
  discord: {
    logs: {
      webhook: string
      logsConfiguration: {
        playerJoin: boolean
        playerDropped: false
      }
    }

    richPresence: {
      active: boolean
      appID: string
      image: string
      imageHoverText: string
      buttons: [
        {
          label: string
          href: string
        },
        {
          label: string
          href: string
        }
      ]
      text: string
    }
  }
}
