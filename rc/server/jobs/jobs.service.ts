import { jobs } from '@shared/load.file'
import { JobT } from '../../types/jobs'

class _JobsService {
  Jobs: any[]
  constructor() {
    this.Jobs = jobs
  }

  findJob(name: string): JobT | false {
    const job = this.Jobs.find((job) => job.name === name)

    if (job) {
      return job
    }

    return false
  }

  async isValid(name: string, grade: string, type: number): Promise<boolean> {
    const job = await this.findJob(name)

    if (!job || job.type !== type) {
      return false
    }

    const isGrade = job.grades.find(
      (gradeName: any) => gradeName.name === grade
    )

    if (!isGrade) {
      return false
    }

    return true
  }
}

const JobsService = new _JobsService()
export default JobsService
