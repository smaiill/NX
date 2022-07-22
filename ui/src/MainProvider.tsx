import { NuiProvider } from 'fivem-nui-react-lib'

const MainProvider = ({ children }: { children: JSX.Element }) => {
  return <NuiProvider resource="NX">{children}</NuiProvider>
}

export default MainProvider
