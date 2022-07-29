import error from '../../../assets/notifications/error.svg'
import normal from '../../../assets/notifications/normal.svg'
import succes from '../../../assets/notifications/succes.svg'
import warn from '../../../assets/notifications/warn.svg'

const NotificationIcon = ({ type }: { type: string }) => {
  let source = succes

  switch (type) {
    case 'warn':
      source = warn
      break
    case 'normal':
      source = normal
      break
    case 'error':
      source = error
      break
  }

  return <img src={source} width={20} alt={`${type}-logo`} />
}

export default NotificationIcon
