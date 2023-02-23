import { Job } from '@nx/types'
import { jobs } from '@shared/load.file'

class _JobsService {
  private readonly jobs: any[]
  constructor() {
    this.jobs = jobs
  }

  public findJob(name: string): Job | false {
    const job = this.jobs.find((job) => job.name === name)

    if (job) return job

    return false
  }

  public isValid(name: string, grade: string, type: number): boolean {
    const job = this.findJob(name)

    if (!job || job.type !== type) return false

    const isGrade = job.grades.find(
      (gradeName: any) => gradeName.name === grade
    )

    if (isGrade) return true

    return false
  }
}

const JobsService = new _JobsService()
export { JobsService }
