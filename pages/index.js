import Head from 'next/head'
import Register from '../components/register'
import LogIn from '../components/login'
import firebase from '../components/firebase'
import { useEffect, useState } from 'react'
import Router from 'next/router'
export default function Home() {
  const [mode, setMode] = useState('register')
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      Router.push('/application')
    } else {
      console.log('not logged in')
    }
  })
  return (
    <div className='bg-dark'>
      <Head>
        <title>Rama Pitching Challenge | Register</title>

      </Head>
      {mode === 'register' && <Register setMode={setMode} />}
      {mode === 'login' && <LogIn setMode={setMode} />}

    </div>
  )
}
