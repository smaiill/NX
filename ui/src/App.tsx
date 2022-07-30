import MainProvider from './MainProvider'
import Input from './components/input/Input'
import LoadingBar from './components/loadingbar/LoadingBar'
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
        <div className="loadingbar-container">
          <LoadingBar />
        </div>
      </div>
    </MainProvider>
  )
}

export default App
