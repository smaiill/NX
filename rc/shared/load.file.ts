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

export const jobs = (() => {
  const resourceName = GetCurrentResourceName()
  const jobs = JSON.parse(LoadResourceFile(resourceName, 'config/nx.jobs.json'))

  return jobs
})()

export const bans = (() => {
  const resourceName = GetCurrentResourceName()
  const bans = JSON.parse(LoadResourceFile(resourceName, 'config/nx.bans.json'))

  return bans
})()
