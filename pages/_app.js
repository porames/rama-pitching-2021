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
<title>Ramathibodi Pitching Challenge | Register</title>
<meta name="title" content="Ramathibodi Pitching Challenge | Register"/>
<meta name="description" content="ระบบรับสมัครการแข่งขัน Ramathibodi Pitching Challenge"/>
<meta property="og:type" content="website"/>
<meta property="og:title" content="Ramathibodi Pitching Challenge | Register"/>
<meta property="og:description" content="ระบบรับสมัครการแข่งขัน Ramathibodi Pitching Challenge"/>
<meta property="og:image" content="/cover.jpeg"/>
<meta property="twitter:card" content="summary_large_image"/>
<meta property="twitter:title" content="Ramathibodi Pitching Challenge | Register"/>
<meta property="twitter:description" content="ระบบรับสมัครการแข่งขัน Ramathibodi Pitching Challenge"/>
<meta property="twitter:image" content="/cover.jpeg"/>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default appWithTranslation(MyApp)
