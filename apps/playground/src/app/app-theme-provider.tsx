import { ColorScheme, ColorSchemeProvider, MantineProvider, useMantineTheme } from '@mantine/core'
import { useHotkeys, useLocalStorage, useMediaQuery } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { DEFAULT_THEME, MantineThemeOverride } from '@mantine/core'

import React, { createContext, ReactNode, Suspense, useContext } from 'react'

export const AppTheme: MantineThemeOverride = {
  colors: {
    brand: DEFAULT_THEME.colors.violet,
  },
  loader: 'dots',
  primaryColor: 'brand',
}

export interface AppThemeProviderContext {
  colorScheme: ColorScheme
  toggleColorScheme: (colorScheme?: ColorScheme) => void
  isSmall: boolean
}

const Context = createContext<AppThemeProviderContext>({} as AppThemeProviderContext)

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const theme = useMantineTheme()
  const isSmall = useMediaQuery(`(max-width: ${theme.breakpoints.md})`)
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  useHotkeys([['mod+J', () => toggleColorScheme()]])

  const value: AppThemeProviderContext = {
    colorScheme,
    toggleColorScheme,
    isSmall,
  }
  return (
    <Context.Provider value={value}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          theme={{
            colorScheme,
            ...AppTheme,
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <ModalsProvider>
            <Notifications zIndex={1000} />
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </Context.Provider>
  )
}

export const useAppTheme = () => useContext(Context)
