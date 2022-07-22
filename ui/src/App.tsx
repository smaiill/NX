import Input from './components/input/Input'
import { useControllers } from './components/useControllers'
import MainProvider from './MainProvider'
import './sass/index.scss'

const App = () => {
  useControllers()

  return (
    <MainProvider>
      <div className="input-container">
        <Input />
      </div>
    </MainProvider>
  )
}

export default App
