// ** Next Imports
import Head from 'next/head'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

// ** Loader Import

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

// ** Config Imports

import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import WindowWrapper from 'src/@core/components/window-wrapper'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** Global css styles
import '../../styles/globals.css'

// ** Katex and Quill Editor Styles
import GlobalLayout from 'src/layouts/GlobalLayout'

import ErrorBoundary from 'src/components/error-boundary'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <BlankLayout>{page}</BlankLayout>)

  const pageSettings = Component.pageSettings ?? undefined

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName}`}</title>
        <meta name='description' content={`${themeConfig.templateName}`} />
        <meta name='keywords' content='Preptest Techinal Test, Preptest' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <meta name='author' content='BFZ' />
        <meta name='robots' content='index, follow' />
        <meta name='googlebot' content='index, follow' />
      </Head>

      <SettingsProvider pageSettings={pageSettings}>
        <SettingsConsumer>
          {({ settings }) => {
            return (
              <ThemeComponent settings={settings}>
                <WindowWrapper>
                  <ErrorBoundary fallback={<h1>ERROR BOUNDARY ERROR</h1>}>
                    <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>
                  </ErrorBoundary>
                </WindowWrapper>
              </ThemeComponent>
            )
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </CacheProvider>
  )
}

export default App
