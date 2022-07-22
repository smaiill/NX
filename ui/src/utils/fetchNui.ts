export const fetchNui = async <T = any>(eventName: string, data?: T) => {
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  }

  const resourceName = (window as any).GetParentResourceName
    ? (window as any).GetParentResourceName()
    : 'NX'

  const resp = await fetch(`https://${resourceName}/${eventName}`, options)

  const responseObj = await resp.json()

  return responseObj
}
