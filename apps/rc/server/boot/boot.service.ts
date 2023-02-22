import { DB } from '@db/db'
import { DBEvents } from '@nx/types'
import { LG } from '@utils/logger'

class _BootService {
  private async checkDatabaseConnection(): Promise<void> {
    const start = Date.now()

    try {
      await DB.exec('SELECT now()')
      const duration = Date.now() - start

      LG.info(`DB connected with success, execution time: [${duration} ms]`)

      emit(DBEvents.DB_CONNECTED)
    } catch (e) {
      LG.error(`error while connecting to your DB: ${e}`)
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
