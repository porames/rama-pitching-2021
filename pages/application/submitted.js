import Head from 'next/head'
import firebase from '../../components/firebase'
import Router from 'next/router'
import Application from '../../components/application'

export default function SubmittedPage() {
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
                    <button onClick={async () => await firebase.auth().signOut()} className='btn btn-icon text-muted'>
                        <span className='material-icons'>logout</span> ออกจากระบบ
                    </button>
                </div>
            </nav>

            <Head>
                <title>Rama Pitching Challenge | Application</title>
            </Head>
            <div className='bg-dark page-wrapper'>
                <div className='rounded shadow-sm form-box-container bg-white' style={{ maxWidth: 700 }}>
                    <h3 className='text-center'>สมัครสำเร็จ</h3>

                </div>
            </div>
        </div>
    )
}
