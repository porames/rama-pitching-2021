import Head from 'next/head'
import Register from '../components/register'
import LogIn from '../components/login'
import firebase from '../components/firebase'
import { useEffect, useState } from 'react'

export default function Home() {
  const [mode, setMode] = useState('register')
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      if (typeof (variable) !== 'undefined') {
        return window.location.replace('/application')
      }
    } else {
      console.log('not logged in')
    }
  })
  return (
    <div className='bg-dark'>
      {mode === 'register' && <Register setMode={setMode} />}
      {mode === 'login' && <LogIn setMode={setMode} />}

    </div>
  )
}
