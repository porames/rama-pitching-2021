import Head from 'next/head'
import firebase from '../../components/firebase'
import PreviewData from '../../components/previewData'
import Modal from 'react-bootstrap/Modal'
import { Formik, ErrorMessage, Field } from 'formik'
import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { withTranslation } from 'next-i18next'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AbstractForm = (props) => {
    const [savedData, setSavedData] = useState('loading')
    const [isSaving, setIsSaving] = useState(false)
    const [showModal, setShowModal] = useState(false)
    useEffect(() => {

        if (typeof (props.abstractFields) !== 'undefined') {
            if (props.abstractFields.length !== 3) {
                setSavedData(['', '', ''])
            }
            else {
                setSavedData(props.abstractFields)
            }
        }
        else {
            setSavedData(['', '', ''])
        }
        console.log(savedData)
    }, [props.abstractFields])


    var wordCounts = {}
    async function save(values) {
        setIsSaving(true)
        try {
            const db = firebase.firestore()
            const uid = firebase.auth().currentUser.uid
            await db.collection('rama-pitching').doc('register').collection('teams')
                .doc(uid)
                .set({
                    abstract_fields: [
                        values['abstract_0'],
                        values['abstract_1'],
                        values['abstract_2']
                    ]
                }, { merge: true })
            toast(<span className='text-dark'><span className='material-icons'>save</span> Saved</span>)
        }
        catch (err) {
            console.log(err)
            toast.error('An error occurred. Please try again later or contact support.', {
                autoClose: 3000
            })
        }
        setIsSaving(false)
    }
    return (
        <>
            <ToastContainer
                position='bottom-left'
                pauseOnHover={false}
                autoClose={2500}
                hideProgressBar={true}
            />
            {savedData !== 'loading' &&

                <Formik
                    initialValues={{
                        abstract_0: savedData[0],
                        abstract_1: savedData[1],
                        abstract_2: savedData[2]
                    }}
                    validate={values => {
                        Object.keys(values).map((key, index) => {
                            if (values[key]) {
                                wordCounts[key] = values[key].match(/\S+/g)?.length;
                            }
                        })

                    }}

                >
                    {({
                        values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting
                    }) => (
                        <form className='mt-4' onChange={handleChange}>
                            <div className='mb-4'>
                                <label className='form-label'>
                                    <b>Indentify the needs</b><br />
                                    <small>Write down the background of the problem you are exploring, the importance of this problem needingly to be solved, and the needs of stakeholders.</small>
                                </label>
                                <Modal show={showModal} onHide={()=>setShowModal(false)}>
                                    <Modal.Header>
                                        <Modal.Title>Confirm Submission {showModal ? 'yee' : 'no'}</Modal.Title>
                                        <button onClick={()=>setShowModal(false)} className='btn btn-icon'><span className='material-icons'>close</span></button>
                                    </Modal.Header>
                                    <Modal.Body>
                                        Hellooo
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button disabled={isSubmitting} onClick={() => {
                                            handleSubmit()
                                        }} type='submit' className='btn-primary btn'>Confirm</button>
                                    </Modal.Footer>
                                </Modal>
                                <Field
                                    name='abstract_0'
                                    as='textarea'
                                    className='form-control'
                                    rows={4}
                                    placeholder='Identify the needs'
                                >
                                </Field>

                                <small>{wordCounts['abstract_0'] ? wordCounts['abstract_0'] : 0}/75 words</small>
                            </div>
                            <div className='mb-4'>
                                <label className='form-label'>
                                    <b>Innovative ideas</b><br />
                                    <small>What is your product that serves and solves the problem? How will the product help solve your problem?</small>
                                </label>
                                <Field
                                    name='abstract_1'
                                    as='textarea'
                                    className='form-control'
                                    rows={4}
                                    placeholder='Innovative ideas'
                                >
                                </Field>
                                <small>{wordCounts['abstract_1'] ? wordCounts['abstract_1'] : 0}/75 words</small>
                            </div>
                            <div className='mb-4'>
                                <label className='form-label'>
                                    <b>Implications</b><br />
                                    <small>'What are your conclusions? Describe the innovation’s importance. How will you suggest using your innovation in order to tackle the problem? (It should be based on logical reasons and limitations are taken into account)</small>
                                </label>
                                <Field
                                    name='abstract_2'
                                    as='textarea'
                                    className='form-control'
                                    rows={4}
                                    placeholder='Implications'
                                >
                                </Field>
                                <small>{wordCounts['abstract_2'] ? wordCounts['abstract_2'] : 0}/75 words</small>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <button type='button' disabled={isSaving} onClick={async () => await save(values)} className='btn btn-light text-primary'>
                                    Save
                                </button>
                                <button type='button' onClick={()=>setShowModal(true)} className='btn btn-primary'>
                                    Submit and turn in
                                </button>
                            </div>
                        </form>
                    )}

                </Formik>
            }
        </>

    )
}

function ClosedPage({ t }) {
    const [userData, setData] = useState(undefined)
    const [abstractFilled, setAbstractFilled] = useState(false)
    const [unfinished, setUnfinished] = useState()
    const member_data_name = ['name', 'school', 'image', 'class', 'tel', 'doc', 'email']
    var members_data = []
    for (var i = 0; i < 3; i++) {
        member_data_name.forEach((name) => {
            members_data.push(`member_${i + 1}_${name}`)
        })
    }
    const valueKeys = [
        'team_name',
        'register_type',
        'teacher_name',
        'teacher_tel',
        'teacher_school',
        'video_url',
        'team_doc',
        'team_poster',
        ...members_data
    ]


    function checkMembers() {
        const members = []
        for (var i = 0; i < 3; i++) {
            var member = []
            member_data_name.forEach((name) => {
                member.push(`member_${i + 1}_${name}`)
            })
            const intersect = _.intersection(member, unfinished)
            if (intersect.length === 0) {
                members.push(true)
            }
            else {
                members.push(false)
            }
        }
        return members
    }
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                const db = firebase.firestore()
                db.collection('rama-pitching').doc('register').collection('teams')
                    .doc(user.uid).get()
                    .then((doc) => {
                        if (doc.exists) {
                            const data = doc.data()
                            setData(doc.data())
                            var uf = []
                            for (const i in valueKeys) {
                                const key = valueKeys[i]
                                if (!data[key] || data[key] == '') {
                                    uf.push(key)
                                }
                            }
                            setUnfinished(uf)
                        }

                    })
            } else {
                if (typeof (window) !== 'undefined') {
                    return window.location.replace('/')
                }
            }
        })
    }, [])
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
            <div className='bg-dark page-wrapper'>

                <div className='container' style={{ maxWidth: 700 }}>
                    {(!abstractFilled && userData) &&
                        <div className='rounded shadow-sm form-box-container bg-white'>
                            <h3 className='text-center'>กรุณากรอกข้อมูลเพิ่มเติม</h3>
                            <AbstractForm regisType={userData['register_type']} abstractFields={userData['abstract_fields']} />
                        </div>
                    }
                    {abstractFilled &&
                        <div className='rounded shadow-sm form-box-container bg-white'>
                            <h3 className='text-center'>{t('regis-closed')}</h3>
                            {userData &&
                                <div>
                                    {userData['submission_time'] ?
                                        <p className='text-center'>{t('submission-time')} {userData['submission_time'].toDate().toLocaleString()}</p>
                                        :
                                        <p className='text-center text-danger text-bold'>{t('didnot-submit')}</p>
                                    }
                                    <PreviewData checkMembers={checkMembers()} values={userData} />
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps({ res, params }) {
    res.statusCode = 302
    var now = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Bangkok'
    })
    now = new Date(now)
    const closeAt = new Date('2021-05-01T07:30:00+07:00')

    if (now <= closeAt) {
        res.setHeader('Location', `/application`)
    }


    return { props: {} }
}


export default withTranslation('common')(ClosedPage)