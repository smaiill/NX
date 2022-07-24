import { RespCB, RespT } from '../types/main'

export const fetchNui = async <T = any>(eventName: string, req: RespT) => {
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
