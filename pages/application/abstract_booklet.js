import Modal from 'react-bootstrap/Modal'
import { Formik, ErrorMessage, Field } from 'formik'
import { withTranslation } from 'next-i18next'
import { ToastContainer, toast } from 'react-toastify'
import React, { useState, useEffect } from 'react'
import firebase from '../../components/firebase'
import Link from 'next/link'
import Router from 'next/router'
import _ from 'lodash'
import 'react-toastify/dist/ReactToastify.css'

const TextArea = (props) => (
    <div className='mb-4'>
        <label className='form-label'>
            <b>{props.label}</b><br />
            <small>{props.description}</small>
        </label>
        <Field
            disabled={props.disabled}
            name={props.name}
            as='textarea'
            className={`form-control ${props.wordsState[props.name] > 75 && 'is-invalid'}`}
            rows={4}
            placeholder='Innovative ideas'
        >
        </Field>
        <small className={`${props.wordsState[props.name] > 75 && 'invalid-feedback'}`}>{props.wordsState[props.name] ? props.wordsState[props.name] : 0}/75 words</small>
    </div>
)

const AbstractForm = ({ props, t }) => {
    const [savedData, setSavedData] = useState('loading')
    const [submissionTime, setSubmissionTime] = useState(undefined)
    const [editPermission, setEditPermission] = useState(false)
    const [regisType, setRegisType] = useState(undefined)
    const [isSaving, setIsSaving] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [wordsState, setWordsState] = useState({})

    function initWordsState(values) {
        var wordCounts = {}
        for (const i in values) {
            wordCounts[`abstract_${i}`] = values[i].match(/\S+/g)?.length
        }
        setWordsState(wordCounts)
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
                            setRegisType(data['register_type'])
                            if (data['abstract_fields']) {
                                if (data['abstract_fields'].length !== 3) {
                                    setSavedData(['', '', ''])
                                }
                                else {
                                    setSavedData(data['abstract_fields'])
                                    initWordsState(data['abstract_fields'])
                                }
                            }
                            else {
                                setSavedData(['', '', ''])

                            }
                            if (!data['abstract_submission_time']) {
                                setEditPermission(true)
                            }
                            else {
                                setSubmissionTime(data['abstract_submission_time'])
                            }
                        }

                    })
            } else {
                if (typeof (window) !== 'undefined') {
                    return window.location.replace('/')
                }
            }
        })
        console.log(savedData)
    }, [])



    async function save(values) {
        setIsSaving(true)
        try {
            const db = firebase.firestore()
            const uid = firebase.auth().currentUser.uid
            console.log(uid)
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
        <div>
            <nav className="navbar navbar-light bg-white py-3" style={{ borderBottom: 'solid 1px #e5e7eb' }}>
                <div className='container'>
                    <Link href='/application'>
                        <a className='text-decoration-none text-dark'>
                            <h4 className='mb-0'>
                                {t('register-header')}
                            </h4>
                        </a>
                    </Link>
                    <button onClick={async () => await firebase.auth().signOut()} className='btn btn-icon text-muted'>
                        <span className='material-icons'>logout</span> {t('logout')}
                    </button>
                </div>
            </nav>
            <div className='bg-dark page-wrapper'>
                <div className='container' style={{ maxWidth: 700 }}>
                    <div className='rounded shadow-sm form-box-container bg-white'>
                        <h3 className='text-center'>Abstract Booklet</h3>
                        {submissionTime &&
                            <p className='text-center'>Submitted successfully at {submissionTime.toDate().toLocaleString()}</p>
                        }
                        <ToastContainer
                            position='bottom-left'
                            pauseOnHover={false}
                            autoClose={2500}
                            hideProgressBar={true}
                        />
                        {savedData === 'loading' &&
                            <div className='d-flex justify-content-center align-items-center mt-4'>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        }
                        {savedData !== 'loading' &&

                            <Formik
                                initialValues={{
                                    abstract_0: savedData[0],
                                    abstract_1: savedData[1],
                                    abstract_2: savedData[2]
                                }}
                                validate={values => {
                                    var errors = {}
                                    var wordCounts = {}
                                    Object.keys(values).map((key, index) => {
                                        if (values[key]) {
                                            const wordLength = values[key].match(/\S+/g)?.length
                                            wordCounts[key] = wordLength
                                            if (wordLength > 75) {
                                                errors[key] = true
                                            }
                                        }
                                    })
                                    setWordsState(wordCounts)
                                    return errors
                                }}
                                onSubmit={async (values) => {
                                    try {
                                        const db = firebase.firestore()
                                        const uid = firebase.auth().currentUser.uid
                                        console.log(uid)
                                        await db.collection('rama-pitching').doc('register').collection('teams')
                                            .doc(uid)
                                            .set({
                                                abstract_fields: [
                                                    values['abstract_0'],
                                                    values['abstract_1'],
                                                    values['abstract_2']
                                                ],
                                                abstract_submission_time: firebase.firestore.FieldValue.serverTimestamp()
                                            }, { merge: true })
                                        return Router.push('/application/submitted')
                                    }
                                    catch (err) {
                                        toast.error('An error occurred. Please try again later or contact support.', {
                                            autoClose: 3000
                                        })
                                        console.log(err)
                                    }
                                }}

                            >
                                {({
                                    values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting
                                }) => (
                                    <form className='mt-4' onChange={handleChange}>
                                        <Modal show={showModal} onHide={() => setShowModal(false)}>
                                            <Modal.Header>
                                                <Modal.Title>Confirm Submission.</Modal.Title>
                                                <button onClick={() => setShowModal(false)} className='btn btn-icon'><span className='material-icons'>close</span></button>
                                            </Modal.Header>
                                            <Modal.Body>
                                                By clicking <b>Confirm</b> button, the applicant agrees that the latest information provided is final and cannot be changed later.
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <button disabled={isSubmitting} onClick={() => {
                                                    handleSubmit()
                                                }} type='submit' className='btn-primary btn'>Confirm</button>
                                            </Modal.Footer>
                                        </Modal>

                                        <TextArea
                                            disabled={!editPermission}
                                            name='abstract_0'
                                            label='Identify the needs'
                                            wordsState={wordsState}
                                            description={
                                                regisType === 'innovation' ?
                                                    'Write down the background of the problem you are exploring, the importance of this problem needingly to be solved, and the needs of stakeholders.'
                                                    :
                                                    'Write down the background of the problem you are exploring, the importance of this problem needingly to be solved, the needs of stakeholders, and include your problem statement if possible.'
                                            }
                                        />
                                        <TextArea
                                            disabled={!editPermission}
                                            name='abstract_1'
                                            label={
                                                regisType === 'innovation' ?
                                                    'Innovative ideas'
                                                    :
                                                    'Recommendations'
                                            }
                                            wordsState={wordsState}
                                            description={
                                                regisType === 'innovation' ?
                                                    'What is your product that serves and solves the problem? How will the product help solve your problem?'
                                                    :
                                                    'The set of solutions that you are proposing to solve the problems (be concise by describing not too in detail)'
                                            }
                                        />
                                        <TextArea
                                            disabled={!editPermission}
                                            name='abstract_2'
                                            label='Implications'
                                            wordsState={wordsState}
                                            description={
                                                regisType === 'innovation' ?
                                                    'What are your conclusions? Describe the innovation’s importance. How will you suggest using your innovation in order to tackle the problem? (It should be based on logical reasons and limitations are taken into account).'
                                                    :
                                                    'How will you suggest using your recommendations in order to tackle the problem? (Limitations are taken into account).'
                                            }
                                        />
                                        {editPermission &&
                                            <div className='d-flex justify-content-between'>
                                                <button type='button' disabled={isSaving || !_.isEmpty(errors)} onClick={async () => await save(values)} className='btn btn-light text-primary'>
                                                    Save
                                                </button>
                                                <button type='button' disabled={!_.isEmpty(errors)} onClick={() => setShowModal(true)} className='btn btn-primary'>
                                                    Submit and Turn in
                                                </button>
                                            </div>
                                        }
                                    </form>
                                )}

                            </Formik>
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default withTranslation('common')(AbstractForm)