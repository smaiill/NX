import { Job, SavedJob } from '@nx/types'
import { JobsDB } from './jobs.db'

class _JobsService {
  private jobs: SavedJob[]
  private db: typeof JobsDB
  constructor() {
    this.jobs = []
    this.db = JobsDB
    this.init()
  }

  public findJob(name: string): Job | null {
    const job = this.jobs.find((job) => job.name === name)

    if (job) return job

    return null
  }

  public isValid(name: string, grade: string, type: number): boolean {
    const job = this.findJob(name)

    if (!job || job.type !== type) return false

    const isGrade = job.grades.find((gradeName) => gradeName.name === grade)

    if (isGrade) return true

    return false
  }

  private async init() {
    const res = await this.db.fetchAll()

    for (const job of res) {
      job.grades = JSON.parse(job.grades as unknown as string)
    }

    this.jobs = res
  }
}

const JobsService = new _JobsService()
export { JobsService }
