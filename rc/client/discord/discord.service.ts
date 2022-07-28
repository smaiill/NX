import { config } from '@shared/load.file'
import { ConfigT } from '../../types/configs'

class _DiscordService {
  private readonly richPresenceConfig: ConfigT
  constructor() {
    this.richPresenceConfig = config
  }

  public init() {
    if (!this.richPresenceConfig.discord.richPresence.active) return
    SetDiscordAppId(this.richPresenceConfig.discord.richPresence.appID)
    SetDiscordRichPresenceAsset(
      this.richPresenceConfig.discord.richPresence.image
    )
    SetDiscordRichPresenceAssetText(
      this.richPresenceConfig.discord.richPresence.imageHoverText
    )
    SetDiscordRichPresenceAction(
      0,
      this.richPresenceConfig.discord.richPresence.buttons[0].label,
      this.richPresenceConfig.discord.richPresence.buttons[0].href
    )
    SetDiscordRichPresenceAction(
      1,
      this.richPresenceConfig.discord.richPresence.buttons[1].label,
      this.richPresenceConfig.discord.richPresence.buttons[1].href
    )
    SetRichPresence(this.richPresenceConfig.discord.richPresence.text)
  }
}

const DiscordService = new _DiscordService()
DiscordService.init()
export default DiscordService
