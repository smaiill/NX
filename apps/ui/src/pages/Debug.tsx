import {
  ButtonDanger,
  ButtonPrimary,
  ButtonSuccess,
  ButtonWarn,
  Checkbox,
  Container,
  ContainerPrimary,
  ContainerSecondary,
  Input,
} from '@nx/lib'
import { isEnvBrowser } from '../utils/misc'

const Debug = () => {
  const browser = isEnvBrowser()

  if (!browser) {
    return null
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: 20,
        padding: 10,
        backgroundColor: '#46484e',
        flexDirection: 'column',
        marginTop: 600,
        // height: '100vh'
      }}
    >
      <ButtonPrimary>Hello world !</ButtonPrimary>
      <ButtonDanger>Hello world !</ButtonDanger>
      <ButtonSuccess>Hello world !</ButtonSuccess>
      <ButtonWarn>Hello world !</ButtonWarn>

      <Input label="Hello world !" />

      <Checkbox>Hello world</Checkbox>

      <Container>Hello world</Container>
      <ContainerPrimary>Hello world</ContainerPrimary>
      <ContainerSecondary>Hello world</ContainerSecondary>
    </div>
  )
}

export default Debug
