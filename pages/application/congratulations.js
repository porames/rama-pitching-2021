import firebase from '../../components/firebase'
import React, { useEffect, useState } from 'react'
import { withTranslation } from '../../i18'
import LanguageSwitcher from '../../components/languageSwitcher'
import Link from 'next/link'
import _ from 'lodash'

const Avatar = (props) => {
    const [imgUrl, setImgUrl] = useState(undefined)
    useEffect(() => {
        var storage = firebase.storage();
        storage.ref(props.path).getDownloadURL()
            .then((url) => {
                setImgUrl(url)
            })

    }, [imgUrl])
    return (
        <div className='avatar' style={{ backgroundImage: `url(${imgUrl})` }} />
    )
}

function CongratsPage({ t, props }) {
    const [data, setData] = useState(undefined)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                const db = firebase.firestore()
                db.collection('rama-pitching').doc('register').collection('teams')
                    .doc(user.uid).get()
                    .then((doc) => {
                        if (doc.exists) {
                            const data = doc.data()
                            if(_.isUndefined(data.certificates) && typeof (window) !== 'undefined'){
                                return window.location.replace('/application/closed')                                
                            }
                            setData(data)
                            console.log(data)
                        }

                    })
            } else {
                if (typeof (window) !== 'undefined') {
                    return window.location.replace('/')
                }
            }
        })
    }, [])
    async function downloadCert(path) {
        var windowReference = window.open();
        var storage = firebase.storage();
        const url = await storage.ref(path).getDownloadURL()
        if (typeof (window) !== 'undefined') {
            windowReference.location = url;
        }
    }
    return (
        <div>
            <nav className='navbar navbar-light bg-white py-3' style={{ borderBottom: 'solid 1px #e5e7eb' }}>
                <div className='container'>
                    <h4 className='mb-0'>
                        {t('register-header')}
                    </h4>
                    <button onClick={async () => await firebase.auth().signOut()} className='btn btn-icon text-muted'>
                        <span className='material-icons'>logout</span> {t('logout')}
                    </button>
                </div>
            </nav>
            <div className='bg-dark page-wrapper'>
                <div className='container'>
                    {data &&
                        <div className='rounded shadow-sm form-box-container bg-white'>
                            <h2 className='text-center'>{t('download-cert')}</h2>
                            <h6 className='text-center'>
                                {t('congrats-header')}<br/>
                                - Ramathibodi Pitching Challenge 2021 -
                            </h6>                        
                            <p className='text-center'>{t('cert-description')}</p>
                            <div className='my-4 d-flex justify-content-center flex-column flex-md-row'>
                                {data.certificates.map((cert, index) => {
                                    return (
                                        <div key={index} className='d-flex p-3 flex-column align-items-center'>
                                            <Avatar path={data?.[`member_${index + 1}_image`]} />
                                            <div><b>{data?.[`member_${index + 1}_name`]}</b></div>
                                            <button className='btn btn-primary mt-2' onClick={() => downloadCert(cert)}>
                                                <span className='material-icons mr-2'>
                                                    file_download
                                                </span>
                                                {t('download-cert')}
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='d-flex justify-content-center'>
                            <Link href='/application/abstract_booklet'>
                                <button className='btn btn-secondary'>
                                    <span class="material-icons">create</span> Fill Abstract Booklet (Optional)
                                </button>
                            </Link>
                            </div>
                        </div>
                    }
                    <LanguageSwitcher />
                </div>
            </div>

        </div>
    )
}
export default withTranslation('common')(CongratsPage)