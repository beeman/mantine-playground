import { Button, Container } from '@mantine/core'
import { AppThemeProvider } from './app-theme-provider'

export function App() {
  return (
    <AppThemeProvider>
      <Container>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
      </Container>
    </AppThemeProvider>
  )
}
