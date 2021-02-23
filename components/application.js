import React, { useState, useEffect } from 'react'
import { Formik, ErrorMessage, setFieldValue } from 'formik'
import firebase from './firebase'
import Member from './member'
import Teacher from './teacher'
import Submission from './submission'
import GeneralInfo from './generalInfo'
import StepBar from './stepBar'
import Modal from 'react-bootstrap/Modal'
import Content from './content'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Router from 'next/router'
import { withTranslation } from '../i18'
import LanguageSwitcher from './languageSwitcher'

const Success = () => (<span className="material-icons">check_circle_outline</span>)
const Warning = () => (<span className="material-icons">error_outline</span>)

const MemberButton = (props) => {
    const [imageUrl, setImageUrl] = useState(undefined)
    const { values, number, setSelectedMember, t } = props
    useEffect(async () => {
        if (values[`member_${number}_image`] !== '') {
            const url = await firebase.storage().ref().child(values[`member_${number}_image`])
                .getDownloadURL()
            setImageUrl(url)
        }
    }, [values[`member_${number}_image`]])

    return (
        <div className='col-md-4'>
            <button type='button' onClick={() => setSelectedMember(number)} className='btn py-4 w-100  elevation-1 my-3 border'>
                <div className='flex-y-middle'>
                    <div className='avatar mb-3'
                        style={{ backgroundImage: `url(${imageUrl})` }}
                    />
                    <h5>{t('member')} {number}</h5>
                    <div className='text-left'>
                        <div>
                            {(values[`member_${number}_name`] && values[`member_${number}_school`] && values[`member_${number}_class`] && values[`member_${number}_tel`]) && values[`member_${number}_address`] && values[`member_${number}_email`] ?
                                <span className='text-success'><Success /> {t('general-info')}</span> :
                                <span className='text-warning'><Warning /> {t('general-info')}</span>
                            }
                        </div>
                        <div>
                            {(values[`member_${number}_image`]) ?
                                <span className='text-success'><Success /> {t('photo')}</span> :
                                <span className='text-warning'><Warning /> {t('photo')}</span>
                            }
                        </div>
                        <div>
                            {(values[`member_${number}_doc`]) ?
                                <span className='text-success'><Success /> {t('school-doc')}</span> :
                                <span className='text-warning'><Warning /> {t('school-doc')}</span>
                            }
                        </div>
                    </div>
                </div>
            </button>
        </div>
    )
}
const Members = (props) => {
    const { isSubmitting, handleChange, handleBlur, setFieldValue, handleSubmit, values, t } = props
    const [selectedMember, setSelectedMember] = useState(undefined)
    var membersElm = []
    for (var i = 0; i < 3; i++) {
        membersElm.push(<MemberButton t={t} values={values} setSelectedMember={setSelectedMember} key={i + 1} number={i + 1} />)
    }
    async function close() {
        setSelectedMember(undefined)
    }
    return (
        <div className='row'>
            <div className='col-12'>
                <h3 className='text-center mb-4'>{t('team-member-info')}</h3>
            </div>
            <Modal scrollable={true} size='lg' show={selectedMember !== undefined} onHide={async () => await close()}>
                <Modal.Header>
                    <Modal.Title>{t('member')} {selectedMember}</Modal.Title>
                    <button onClick={async () => await close()} className='btn btn-icon'><span className='material-icons'>close</span></button>
                </Modal.Header>
                <Modal.Body>
                    <Member handleSubmit={handleSubmit} setFieldValue={setFieldValue} number={selectedMember} handleChange={handleChange} handleBlur={handleBlur} values={values} />
                </Modal.Body>
                <Modal.Footer>
                    <button disabled={isSubmitting} onClick={() => {
                        close()
                        handleSubmit()
                    }} type='submit' className='btn-primary btn'>{t('btn-save')}</button>
                </Modal.Footer>
            </Modal>
            {membersElm}
        </div>
    )
}

const Register = ({ t }) => {
    const [currentStep, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [initVals, setInitVals] = useState({})
    const [user, setUser] = useState(undefined)
    function nextPage() {
        if (currentStep <= 4) {
            setStep(currentStep + 1)
        }
    }
    const db = firebase.firestore().collection('rama-pitching')
    const member_data_name = ['name', 'school', 'image', 'class', 'tel', 'doc', 'email']
    var members_data = {}
    for (var i = 0; i < 3; i++) {
        member_data_name.forEach((name) => {
            members_data[`member_${i + 1}_${name}`] = ''
        })
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user)
                db.doc('register').collection('teams').doc(user.uid)
                    .onSnapshot((doc) => {
                        setIsLoading(false)
                        if (doc.exists) {
                            const data = doc.data()
                            if (data['submission_time']) {
                                return Router.push('application/submitted')
                            }
                            else {
                                setInitVals(data)
                            }

                        }
                        else {
                            setInitVals({
                                team_name: '',
                                register_type: '',
                                teacher_name: '',
                                teacher_tel: '',
                                teacher_school: '',
                                video_url: '',
                                team_doc: '',
                                team_poster: '',
                                ...members_data
                            })
                        }
                    })
            }

        })
    }, [])
    return (
        <div className='container w-100'>
            <div className='rounded shadow container bg-white px-4 pt-5 pb-3'>
                <Modal show={isLoading} onHide={() => { }} centered>
                    <Modal.Body>
                        <div className='container text-center mt-2'>
                            <div className="spinner-border text-primary mb-3" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <h4 className='text-muted mb-0'>{t('please-wait')}</h4>
                        </div>
                    </Modal.Body>
                </Modal>
                <ToastContainer
                    position='bottom-left'
                    pauseOnHover={false}
                    autoClose={2500}
                    hideProgressBar={true}
                />
                <StepBar setStep={(i) => setStep(i)} step={currentStep} />
                <Formik
                    enableReinitialize={true}
                    initialValues={initVals}
                    validate={values => {
                        const errors = {}
                        return errors
                    }}
                    onSubmit={async (values) => {
                        console.log('saved')
                        await db.doc('register').collection('teams').doc(user.uid).set(values, { merge: true })
                        toast(<span className='text-dark'><span className='material-icons'>save</span> {t('toast-saved')}</span>)
                        setSubmitting(false)
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue
                        /* and other goodies */
                    }) => (
                        <form className='mt-4' onSubmit={handleSubmit}>
                            {currentStep === 1 &&
                                <>
                                    <GeneralInfo email={user ? user['email'] : ''} setFieldValue={setFieldValue} handleChange={handleChange} handleBlur={handleBlur} values={values} />
                                    <Teacher handleChange={handleChange} handleBlur={handleBlur} values={values} />
                                </>
                            }
                            {currentStep === 2 &&
                                <Members t={t} handleSubmit={handleSubmit} setFieldValue={setFieldValue} handleChange={handleChange} handleBlur={handleBlur} values={values} isSubmitting={isSubmitting} />
                            }
                            {currentStep === 3 &&
                                <Content handleSubmit={handleSubmit} setFieldValue={setFieldValue} handleChange={handleChange} handleBlur={handleBlur} values={values} isSubmitting={isSubmitting} />
                            }
                            {currentStep === 4 &&
                                <Submission handleSubmit={handleSubmit} handleChange={handleChange} handleBlur={handleBlur} values={values} />
                            }
                            {currentStep !== 4 &&
                                <div className='row mt-4'>
                                    <div className='col-md-6'></div>
                                    <div className='col-md-6 text-right'>
                                        <button disabled={isSubmitting} className='text-primary mb-4 btn btn-light' style={{ minWidth: 150 }} type='submit'>
                                            {t('btn-save')}
                                        </button>
                                        <button disabled={isSubmitting} onClick={() => nextPage()} className='ml-4 mb-4 btn btn-primary' style={{ minWidth: 150 }}>
                                            {t('btn-save-next')}
                                        </button>
                                    </div>
                                </div>
                            }
                        </form>
                    )}
                </Formik>
            </div>
            <div className='text-center'>
            <LanguageSwitcher />
            </div>
        </div>
    )
}

export default withTranslation('common')(Register)