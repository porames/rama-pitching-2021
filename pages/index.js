import Head from 'next/head'
import Form from '../components/form'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
export default function Home() {
  return (
    <div className='container'>
      <Head>
        <title>Rama Pitching Challenge | Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Form/>

    </div>
  )
}
