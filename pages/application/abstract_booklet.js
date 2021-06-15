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
    const [savedAbstracts, setSavedAbstracts] = useState('loading')
    const [savedKeywords, setSavedKeywords] = useState('loading')
    const [savedContactEmail, setSavedContactEmail] = useState('loading')
    const [submissionTime, setSubmissionTime] = useState(undefined)
    const [editPermission, setEditPermission] = useState(false)
    const [regisType, setRegisType] = useState(undefined)
    const [isSaving, setIsSaving] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [keywordsCount, setKeywordsCount] = useState(0)
    const [wordsState, setWordsState] = useState({})
    const [completed, setCompleted] = useState(false)

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
                                    setSavedAbstracts(['', '', ''])
                                }
                                else {
                                    setSavedAbstracts(data['abstract_fields'])
                                    initWordsState(data['abstract_fields'])
                                }
                            }
                            else {
                                setSavedAbstracts(['', '', ''])
                            }
                            if (data['keywords']) {
                                setSavedKeywords(data['keywords'])
                                setKeywordsCount(data['keywords'].split(',').length)
                            }
                            else {
                                setSavedKeywords('')
                            }
                            if (data['contact_email'] || data['contact_email'] == '') {
                                setSavedContactEmail(data['contact_email'])
                            }
                            else {
                                const userEmail = firebase.auth().currentUser.email
                                setSavedContactEmail(userEmail)
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
    }, [])

    function checkCompleted(values) {
        if (
            values['keywords'].trim() !== '' &&
            values['contact_email'].trim() !== '' &&
            values['abstract_0'].trim() !== '' &&
            values['abstract_1'].trim() !== '' &&
            values['abstract_2'].trim() !== ''
        ) {
            return setCompleted(true)
        }
        else {
            return setCompleted(false)
        }
    }
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
                    ],
                    contact_email: values['contact_email'],
                    keywords: values['keywords']
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
                        <h3 className='text-center'>Proposal Booklet</h3>
                        {submissionTime
                            ? <p className='text-center'>Submitted successfully at {submissionTime.toDate().toLocaleString()}</p>
                            : <p className='text-center text-danger'>Please provide all descriptions in English.</p>
                        }
                        <ToastContainer
                            position='bottom-left'
                            pauseOnHover={false}
                            autoClose={2500}
                            hideProgressBar={true}
                        />
                        {savedAbstracts === 'loading' &&
                            <div className='d-flex justify-content-center align-items-center mt-4'>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        }
                        {(savedAbstracts !== 'loading' && savedContactEmail !== 'loading' && savedKeywords !== 'loading') &&
                            <Formik
                                validateOnMount={true}
                                initialValues={{
                                    contact_email: savedContactEmail,
                                    keywords: savedKeywords,
                                    abstract_0: savedAbstracts[0],
                                    abstract_1: savedAbstracts[1],
                                    abstract_2: savedAbstracts[2],

                                }}
                                validate={values => {
                                    checkCompleted(values)
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
                                    if (values['keywords'].trim() !== '') {
                                        const count = values['keywords'].split(',').length
                                        setKeywordsCount(count)
                                        if (count > 5) {
                                            errors['keywords'] = true
                                        }
                                    }
                                    else {
                                        setKeywordsCount(0)
                                    }
                                    setWordsState(wordCounts)
                                    return errors
                                }}
                                onSubmit={async (values) => {
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
                                                ],
                                                contact_email: values['contact_email'],
                                                keywords: values['keywords'],
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
                                                    'Write down the background of the problem you are exploring, the importance of this problem needily to be solved, and the needs of stakeholders.'
                                                    :
                                                    'Write down the background of the problem you are exploring, the importance of this problem needily to be solved, the needs of stakeholders, and include your problem statement if possible.'
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
                                                    'Write down the set of solutions that you are proposing to solve the problems (be as concise as possible without describing too much in detail)'
                                            }
                                        />
                                        <TextArea
                                            disabled={!editPermission}
                                            name='abstract_2'
                                            label='Implications'
                                            wordsState={wordsState}
                                            description={
                                                regisType === 'innovation' ?
                                                    'What are your conclusions? Describe the innovation’s importance. How will you suggest using your innovation in order to tackle the problem? (it should be based on logical reasons and limitations should be taken into account)'
                                                    :
                                                    'How will you suggest using your recommendations in order to tackle the problem?  (limitations should be taken into account)'
                                            }
                                        />
                                        <div className='mb-4'>
                                            <label className='form-label'>
                                                <b>Keywords (Maximum: 5)</b><br />
                                                <small>Words or phrases which capture the most important aspects of your project. (separate each keyword with a comma).</small>
                                            </label>
                                            <Field
                                                disabled={!editPermission}
                                                className={`form-control ${keywordsCount > 5 && 'is-invalid'}`}
                                                name='keywords'
                                                placeholder='Keywords'
                                            />
                                            <small className={keywordsCount > 5 && 'text-danger'}>{keywordsCount}/5 Keywords</small>
                                        </div>
                                        <div className='mb-4'>
                                            <label className='form-label'>
                                                <b>Contact Email</b><br />
                                                <small>In case the given contact email needs to be changed.</small>
                                            </label>
                                            <Field
                                                disabled={!editPermission}
                                                className='form-control'
                                                name='contact_email'
                                                placeholder='Contact Email'
                                            />
                                        </div>
                                        {editPermission &&
                                            <div className='d-flex justify-content-between'>
                                                <button type='button' disabled={isSaving || !_.isEmpty(errors)} onClick={async () => await save(values)} className='btn btn-light text-primary'>
                                                    Save
                                                </button>
                                                <button type='button' disabled={!_.isEmpty(errors) || !completed} onClick={() => setShowModal(true)} className='btn btn-primary'>
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