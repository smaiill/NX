import { ConfigT } from '../../types/configs'
import { DiscordWebhookI } from '../../types/main'
import { config } from '@shared/load.file'
import fetch from 'node-fetch'
import { logger } from 's@utils/logger'

class _DiscordService {
  private readonly config: ConfigT
  constructor() {
    this.config = config
  }

  public sendWebhook({ data, options }: DiscordWebhookI): void {
    if (!data) {
      logger.error('Invalid data for webhook.')
      return
    }
    fetch(options?.url ?? this.config.discord.logs.webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch((err) => {
      logger.error(`error while sedning the webhook: ${err}`)
    })
  }
}

const DiscordService = new _DiscordService()
export default DiscordService
