import { Form } from '../components/form/Form'
import { LoadingBarWrapper } from '../components/loadingbar/LoadingBarWrapper'
import { Menu } from '../components/menu/Menu'
import { Notification } from '../components/notification/Notification'
import { Timeline } from '../components/timeline/Timeline'

const Main = () => {
  return (
    <div className="main">
      <div className="notifications__container">
        <Notification />
      </div>
      <div className="input__wrapper">
        <Form />
      </div>
      <div className="loadingbar__wrapper">
        <LoadingBarWrapper />
      </div>
      <div className="timeline__wrapper">
        <Timeline />
      </div>
      <div className="menu__container">
        <Menu />
      </div>
    </div>
  )
}

export default Main
