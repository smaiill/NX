import { Configuration } from '../../../packages/types/src'
// @

declare var GetCurrentResourceName: () => string
declare var LoadResourceFile: (resourceName: string, fileName: string) => string

export const config = (() => {
  const resourceName = GetCurrentResourceName()
  const config = JSON.parse(
    LoadResourceFile(resourceName, 'config/nx.config.json'),
  )

  return config as Configuration
})()
