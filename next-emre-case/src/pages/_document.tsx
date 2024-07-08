// ** React Import
import { Children } from 'react'

// ** Next Import
import Document, { Html, Head, Main, NextScript } from 'next/document'

// ** Emotion Imports
import createEmotionServer from '@emotion/server/create-instance'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'
import { Box, Container } from '@mui/material'
import Link from 'next/link'

class CustomDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
          />

          <link rel='manifest' href='/manifest.json' />

          <link rel='icon' href='/favicon.ico' type='image/x-icon' />
          <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
          <link rel='apple-touch-icon' href='/favicon.ico' />
        </Head>
        <body>
          <Container maxWidth='xl'>
            <Box display={'flex'} justifyContent={'end'} gap={'40px'} mt={'30px'} fontSize={'20px'}>
              <Link href='/'>Main Page</Link>
              <Link href='/packages'>Packages</Link>
            </Box>
          </Container>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

CustomDocument.getInitialProps = async ctx => {
  // eslint-disable-next-line testing-library/render-result-naming-convention
  const originalRenderPage = ctx.renderPage
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => (
        <App
          {...props} // @ts-ignore
          emotionCache={cache}
        />
      )
    })

  const initialProps = await Document.getInitialProps(ctx)
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map(style => {
    return (
      <style
        key={style.key}
        dangerouslySetInnerHTML={{ __html: style.css }}
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
      />
    )
  })

  return {
    ...initialProps,
    styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags]
  }
}

export default CustomDocument
