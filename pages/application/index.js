import Head from 'next/head'
import firebase from '../../components/firebase'
import Router from 'next/router'
import Application from '../../components/application'
import {withTranslation} from '../../i18'

const ApplicationPage = ({t}) => {
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
            {t('register-header')}
          </h4>
          <button onClick={async () => await firebase.auth().signOut()} className='btn btn-icon text-muted'>
            <span className='material-icons'>logout</span> {t('logout')}
          </button>
        </div>
      </nav>

      <Head>
        <title>Rama Pitching Challenge | Application</title>
      </Head>
      <div className='bg-dark page-wrapper'>
        <Application />        
      </div>
    </div>
  )
}

export default withTranslation('common')(ApplicationPage)