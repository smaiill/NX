export const config = (() => {
  const resourceName = GetCurrentResourceName()
  const config = JSON.parse(
    LoadResourceFile(resourceName, 'config/nx.config.json')
  )

  return config
})()
