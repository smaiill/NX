interface JobGradeT {
  name: string
  label: string
  salary: number
  skin: {
    male: any
    female: any
  }
}

export interface JobT {
  name: string
  label: string
  type: number
  grades: JobGradeT[]
}
