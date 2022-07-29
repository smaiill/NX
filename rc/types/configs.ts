export interface ConfigT {
  readonly database: {
    readonly host: string
    readonly user: string
    readonly password: string
    readonly database: string
  }
  readonly discord: {
    readonly logs: {
      readonly webhook: string
      readonly logsConfiguration: {
        readonly playerJoin: boolean
        readonly playerDropped: false
      }
    }

    readonly richPresence: {
      readonly active: boolean
      readonly appID: string
      readonly image: string
      readonly imageHoverText: string
      readonly buttons: [
        {
          readonly label: string
          readonly href: string
        },
        {
          readonly label: string
          readonly href: string
        }
      ]
      readonly text: string
    }
  }
}
