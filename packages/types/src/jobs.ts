interface JobGrade {
  name: string
  label: string
  salary: number
  skin: {
    male: any
    female: any
  }
}
export interface Job {
  name: string
  label: string
  type: number
  grades: JobGrade[]
}

export interface JobCB {
  job: string
  job_grade: string
  type: number
}

export type SavedJob = Job & { id: number }
