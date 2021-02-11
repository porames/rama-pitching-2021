import Head from 'next/head'
import Register from '../components/register'
import firebase from '../components/firebase'
import Router from 'next/router'

export default function Home() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      Router.push('/application')
    } else {
      console.log('not logged in')
    }
  })
  return (
    <div className='container'>
      <Head>
        <title>Rama Pitching Challenge | Register</title>

      </Head>
      <Register/>

    </div>
  )
}
