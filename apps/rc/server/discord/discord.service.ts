import { DiscordWebhook } from '@nx/types'
import { LG } from '@utils/logger'

class _DiscordService {
  constructor() {}

  public sendWebhook({ data, options }: DiscordWebhook): void {
    if (!data) {
      LG.error('Invalid data for webhook.')
      return
    }
    fetch(options.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch((err) => {
      LG.error(`error while sending the webhook: ${err}`)
    })
  }
}

const DiscordService = new _DiscordService()
export { DiscordService }
