import { config } from '@shared/load.file'

class _DiscordService {
  private readonly richPresenceConfig: any
  constructor() {
    this.richPresenceConfig = config
  }

  public init() {
    if (!config.discord.richPresence.active) return
    SetDiscordAppId(config.discord.richPresence.appID)
    SetDiscordRichPresenceAsset(config.discord.richPresence.image)
    SetDiscordRichPresenceAssetText(config.discord.richPresence.imageHoverText)
    SetDiscordRichPresenceAction(
      0,
      config.discord.richPresence.buttons[0].label,
      config.discord.richPresence.buttons[0].href
    )
    SetDiscordRichPresenceAction(
      1,
      config.discord.richPresence.buttons[1].label,
      config.discord.richPresence.buttons[1].href
    )
    SetRichPresence(config.discord.richPresence.text)
  }
}

const DiscordService = new _DiscordService()
DiscordService.init()
export default DiscordService
