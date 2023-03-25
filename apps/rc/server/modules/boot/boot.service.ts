import { DB } from '@modules/db/db'
import { t } from '@nx/locale'
import { CodeColors, DBEvents } from '@nx/types'
import { LG } from '@utils/logger'
import { breakingResources } from 'constants/breakingResources'

class _BootService {
  private async checkDatabaseConnection(): Promise<void> {
    const start = Date.now()

    try {
      await DB.exec('SELECT now()')
      const duration = Date.now() - start

      LG.info(
        t('DB_CONNECTED', {
          duration,
        }),
      )

      emit(DBEvents.DB_CONNECTED)
    } catch (e) {
      LG.error(
        t('DB_CONNECTION_ERROR', {
          error: e,
        }),
      )
    }
  }

  private async checkResourceVersion(): Promise<void> {
    // TODO: Check resource version.
  }

  private ascii() {
    console.log(`
    $$    $$ $$      $$ 
    $$$   $$  $$    $$ 
    $$$$  $$   $$  $$  
    $$ $$ $$    $$$$   
    $$  $$$$   $$  $$  
    $$   $$$  $$    $$ 
    $$   $$$ $$      $$     
    `)
  }

  private hasBreakingResources() {
    for (const resource of breakingResources) {
      const isUsed =
        GetResourceState(resource) === 'started' ||
        GetResourceState(resource) === 'starting'

      if (!isUsed) return

      LG.error(
        `You are using a resource that will get in conflict with the framework, you most remove it for a perfect setup. ${CodeColors.ORANGE}[${resource}]^0`,
      )
    }
  }

  public checkResource(): void {
    this.ascii()
    this.checkDatabaseConnection()
    this.checkResourceVersion()
    this.hasBreakingResources()
  }
}

const BootService = new _BootService()
export { BootService }
