// import { useSelector } from 'react-redux'
import { Form } from './components/input/Form'
import { LoadingBarWrapper } from './components/loadingbar/LoadingBarWrapper'
import { Menu } from './components/menu/Menu'
import { Notification } from './components/notification/Notification'
import { Timeline } from './components/timeline/Timeline'
import { useControllers } from './components/useControllers'
import './debug'
import { NuiProvider } from './MainProvider'
import './sass/index.scss'

const App = () => {
  useControllers()

  return (
    <NuiProvider>
      <div className="App">
        <div className="notifications__container">
          <Notification />
        </div>
        <div className={`input-wrapper`}>
          <Form />
        </div>
        <div className="loadingbar-wrapper">
          <LoadingBarWrapper />
        </div>
        <div className="timeline__wrapper">
          <Timeline />
        </div>
        <div className="menu-container">
          <Menu />
        </div>
      </div>
    </NuiProvider>
  )
}

export default App
