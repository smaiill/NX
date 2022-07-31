import MainProvider from './MainProvider'
import Input from './components/input/Input'
import LoadingBarWrapper from './components/loadingbar/LoadingBarWrapper'
import Notification from './components/notification/Notification'
import { useControllers } from './components/useControllers'
import './debug'
import './sass/index.scss'

const App = () => {
  useControllers()

  return (
    <MainProvider>
      <div className="App">
        <div className="notifications-container">
          <Notification />
        </div>
        <div className="input-container">
          <Input />
        </div>
        <div className="loadingbar-wrapper">
          <LoadingBarWrapper />
        </div>
      </div>
    </MainProvider>
  )
}

export default App
