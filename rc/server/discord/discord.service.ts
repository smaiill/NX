import fetch from 'node-fetch'
import { config } from '../../shared/load.file'
import { DiscordWebhookI } from '../../types/main'
import { logger } from '../utils/logger'

class _DiscordService {
  private config: any
  constructor() {
    this.config = config
  }

  sendWebhook({ data, options }: DiscordWebhookI) {
    if (!data) {
      logger.error('Invalid data for webhook.')
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
