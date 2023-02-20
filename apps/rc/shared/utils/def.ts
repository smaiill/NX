import { DefaultData } from '@nx/types'

const DEFAULT_DATA: Record<string, any> = {
  LOADING_BAR: {
    duration: 10,
  },
  NOTIFICATION: {
    type: 'NORMAL',
    duration: 5,
    body: {
      content: 'Normal !',
    },
  },
}

export const overWriteData = <T = any>(
  type: keyof typeof DefaultData,
  data: T
) => {
  const defaultData = DEFAULT_DATA[type]
  return { ...defaultData, ...data }
}
