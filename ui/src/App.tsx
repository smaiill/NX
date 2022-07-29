import MainProvider from './MainProvider'
import Inputs from './components/input/Input'
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
          {/* @ts-ignore */}
          <Inputs />
        </div>
      </div>
    </MainProvider>
  )
}

export default App
