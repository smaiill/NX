import { DiscordWebhookI } from '../../../types/main'
import fetch from 'node-fetch'
import { logger } from 's@utils/logger'

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

const DiscordService = new _DiscordService()
export default DiscordService
