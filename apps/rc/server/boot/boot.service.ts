import { DB } from '@db/db'
import { t } from '@nx/locale'
import { DBEvents } from '@nx/types'
import { LG } from '@utils/logger'

class _BootService {
  private async checkDatabaseConnection(): Promise<void> {
    const start = Date.now()

    try {
      await DB.exec('SELECT now()')
      const duration = Date.now() - start

      LG.info(
        t('DB_CONNECTED', {
          duration,
        })
      )

      emit(DBEvents.DB_CONNECTED)
    } catch (e) {
      LG.error(
        t('DB_CONNECTION_ERROR', {
          error: e,
        })
      )
    }
  }

  private async checkResourceVersion(): Promise<void> {
    // TODO: Check resource version.
  }

  private ascii() {
    console.log(`
    __    __  __    __ 
    /  \  /   |/  |  /  |
    $$  \ $$  |$$ |  $$ |
    $$$  \$$  |$$  \/$$/ 
    $$$$  $$ | $$  $$<  
    $$ $$ $$ |  $$$$  \ 
    $$ |$$$$ | $$ /$$  |
    $$ | $$$ |$$ |  $$ |
    $$/   $$/ $$/   $$/     
    `)
  }

  public checkResource(): void {
    this.ascii()
    this.checkDatabaseConnection()
    this.checkResourceVersion()
  }
}

const BootService = new _BootService()
export { BootService }
