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
