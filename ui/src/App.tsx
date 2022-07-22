import { useServices } from './components/useServices'
import MainProvider from './MainProvider'

const App = () => {
  useServices()

  return (
    <MainProvider>
      <div className="App"></div>
    </MainProvider>
  )
}

export default App
