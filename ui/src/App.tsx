import MainProvider from './MainProvider'
import Input from './components/input/Input'
import LoadingBarWrapper from './components/loadingbar/LoadingBarWrapper'
import Notification from './components/notification/Notification'
import Timeline from './components/timeline/Timeline'
import { useControllers } from './components/useControllers'
import './debug'
import './sass/index.scss'
import { useSelector } from 'react-redux'

const App = () => {
  useControllers()

  const inputStateSlice = useSelector((state: any) => state.input)

  console.log(inputStateSlice)

  return (
    <MainProvider>
      <div className="App">
        <div className="notifications-container">
          <Notification />
        </div>
        <div
          className={`input-wrapper ${
            inputStateSlice.inputData !== null ? 'bg' : ''
          }`}
        >
          <Input />
        </div>
        <div className="loadingbar-wrapper">
          <LoadingBarWrapper />
        </div>
        <div className="timeline-wrapper">
          <Timeline />
        </div>
      </div>
    </MainProvider>
  )
}

export default App
