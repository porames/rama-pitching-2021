import '../style/css/theme.css'
import Head from 'next/head'
import { appWithTranslation } from '../i18'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600&family=Mitr:wght@400;500&display=swap' />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default appWithTranslation(MyApp)
