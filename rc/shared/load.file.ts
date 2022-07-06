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

export const jobs = (() => {
  const resourceName = GetCurrentResourceName()
  const jobs = JSON.parse(
    LoadResourceFile(resourceName, 'config/naf.jobs.json')
  )

  return jobs
})()
