import { Configuration } from '@nx/types'
import { config } from '@shared/load.file'

class _DiscordService {
  private readonly config: Configuration
  constructor() {
    this.config = config

    this.initDiscordRPC()
  }

  public initDiscordRPC(): void {
    if (!this.config.discord.richPresence.active) return
    SetDiscordAppId(this.config.discord.richPresence.appID)
    SetDiscordRichPresenceAsset(this.config.discord.richPresence.image)
    SetDiscordRichPresenceAssetText(
      this.config.discord.richPresence.imageHoverText
    )
    SetDiscordRichPresenceAction(
      0,
      this.config.discord.richPresence.buttons[0].label,
      this.config.discord.richPresence.buttons[0].href
    )
    SetDiscordRichPresenceAction(
      1,
      this.config.discord.richPresence.buttons[1].label,
      this.config.discord.richPresence.buttons[1].href
    )
    SetRichPresence(this.config.discord.richPresence.text)
  }
}

const DiscordService = new _DiscordService()
export { DiscordService }
