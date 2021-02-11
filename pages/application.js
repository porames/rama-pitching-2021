import Head from 'next/head'
import firebase from '../components/firebase'
import Router from 'next/router'
import Application from '../components/application'

export default function ApplicationPage() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      
    } else {
      Router.push('/')
    }
  })
  return (
    <div>
      <nav className="navbar navbar-light bg-white py-3" style={{ borderBottom: 'solid 1px #e5e7eb' }}>
        <div className='container'>
          <h4 className='mb-0'>
          ระบบรับสมัคร
          </h4>
        </div>
      </nav>

      <Head>
        <title>Rama Pitching Challenge | Application</title>
      </Head>
      <div className='bg-dark py-5'>
        <Application />
      </div>
    </div>
  )
}
