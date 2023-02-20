import { Response } from '@nx/types'

export const fetchNui = async (eventName: string, req: Response) => {
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(req),
  }

  const resourceName = (window as any).GetParentResourceName
    ? (window as any).GetParentResourceName()
    : 'NX'

  const resp = await fetch(`https://${resourceName}/${eventName}`, options)
  const responseObj = await resp.json()
  return responseObj
}
