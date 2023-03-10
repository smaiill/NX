import { IGroup } from './permissions'

interface DBConfiguration {
  host: string
  user: string
  password: string
  database: string
}

interface PlayerConfiguration {
  maxWeight: number
}

interface DiscordConfiguration {
  logs: {
    webhook: string
    logsConfiguration: {
      playerJoin: boolean
      playerDropped: boolean
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
      },
    ]
    text: string
  }
}

export interface Configuration {
  database: DBConfiguration
  player: PlayerConfiguration

  accounts: {
    [key: string]: number
  }

  discord: DiscordConfiguration
  permissions: IGroup[]
}
