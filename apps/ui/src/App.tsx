// import { useSelector } from 'react-redux'
import { useControllers } from './components/useControllers'
import './debug'
import { NuiProvider } from './MainProvider'
import Main from './pages/Home'
import './sass/index.scss'

const App = () => {
  useControllers()

  return (
    <NuiProvider>
      <div className="App">
        {/* <Debug /> */}
        <Main />
      </div>
    </NuiProvider>
  )
}

export default App
