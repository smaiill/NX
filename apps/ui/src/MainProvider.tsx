import { NuiProvider as FiveMNuiProvider } from 'fivem-nui-react-lib'

const NuiProvider = ({ children }: { children: JSX.Element }) => {
  return <FiveMNuiProvider resource="NX">{children}</FiveMNuiProvider>
}

export { NuiProvider }
