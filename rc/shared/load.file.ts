export const config = (() => {
  const resourceName = GetCurrentResourceName()
  const config = JSON.parse(
    LoadResourceFile(resourceName, 'config/naf.config.json')
  )

  return config
})()

export const items = (() => {
  const resourceName = GetCurrentResourceName()
  const items = JSON.parse(
    LoadResourceFile(resourceName, 'config/naf.items.json')
  )

  return items
})()
