import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { AppContextProvider } from '../data/context/app-context'
import '../styles/globals.css'
import customTheme from '../utils/theme'
import { ModalContextProvider } from '../data/context/modal-context'

function MyApp({ Component, pageProps }: AppProps) {

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ ...customTheme, colorScheme }} withGlobalStyles withNormalizeCSS>
        <AppContextProvider>
          <ModalContextProvider>
            <Component {...pageProps} />
          </ModalContextProvider>
        </AppContextProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export function reportWebVitals(metrics: NextWebVitalsMetric) {
  //console.log(metrics)
}


export default MyApp
