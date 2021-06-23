import firebase from '../../components/firebase'
import React, { useEffect, useState } from 'react'
import { withTranslation } from '../../i18'
import LanguageSwitcher from '../../components/languageSwitcher'
import Head from 'next/head'

const Avatar = (props) => {
    const [imgUrl, setImgUrl] = useState(undefined)
    useEffect(() => {
        var storage = firebase.storage();
        storage.ref(props.path).getDownloadURL()
            .then((url) => {
                setImgUrl(url)
                console.log(imgUrl)
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
        var storage = firebase.storage();
        const url = await storage.ref(path).getDownloadURL()
        if (typeof (window) !== 'undefined') {
            window.open(url, '_blank').focus()
        }
        return url
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
                            <h2 className='text-center'>{t('congrats-header')}</h2>
                            <p className='text-center'>{t('cert-description')}</p>
                            <div className='mt-4'>
                            {data.certificates.map((cert, index) => {
                                return (
                                    <div key={index} className='d-flex flex-column align-items-center'>
                                        <Avatar path={data[`member_${index + 1}_image`]} />
                                        <div>{data[`member_${index + 1}_name`]}</div>
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
                        </div>
                    }
                    <LanguageSwitcher/>
                </div>
            </div>

        </div>
    )
}
export default withTranslation('common')(CongratsPage)