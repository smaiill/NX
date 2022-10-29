import { DiscordWebhookI } from '../../../types/main'
import { logger } from '@utils/logger'
import fetch from 'node-fetch'

class _DiscordService {
  constructor() {}

  public sendWebhook({ data, options }: DiscordWebhookI): void {
    if (!data) {
      logger.error('Invalid data for webhook.')
      return
    }
    fetch(options.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch((err) => {
      logger.error(`error while sending the webhook: ${err}`)
    })
  }
}

export default new _DiscordService()
