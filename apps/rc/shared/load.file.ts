export const config = (() => {
  const resourceName = GetCurrentResourceName()
  const config = JSON.parse(
    LoadResourceFile(resourceName, 'config/nx.config.json')
  )

  return config
})()

export const items = (() => {
  const resourceName = GetCurrentResourceName()
  const items = JSON.parse(
    LoadResourceFile(resourceName, 'config/nx.items.json')
  )

  return items
})()
