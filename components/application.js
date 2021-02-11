import React, { useState, useEffect } from 'react'
import { Formik, ErrorMessage, setFieldValue } from 'formik'
import firebase from './firebase'
import Member from './member'
import Teacher from './teacher'
import GeneralInfo from './generalInfo'
import StepBar from './stepBar'
import Modal from 'react-bootstrap/Modal'
import Content from './content'

const MemberButton = (props) => (
    <div className='col-md-4'>
        <button onClick={() => props.setSelectedMember(props.number)} className='btn py-4 w-100'>
            <div className='flex-y-middle'>
                <div className='avatar mb-3' />
                <h5>สมาชิก {props.number}</h5>
                <div className='text-left'>
                    <div>ข้อมูล</div>
                    <div>ภาพถ่าย</div>
                    <div>ปพ. 7</div>
                </div>
            </div>
        </button>
    </div>
)
const Members = (props) => {
    const { handleChange, values, handleBlur, setFieldValue } = props
    const [selectedMember, setSelectedMember] = useState(undefined)
    var membersElm = []
    for (var i = 0; i < 3; i++) {
        membersElm.push(<MemberButton setSelectedMember={setSelectedMember} key={i + 1} number={i + 1} />)
    }
    async function close() {
        setSelectedMember(undefined)
    }
    return (
        <div className='row'>
            <div className='col-12'>
                <h3 className='text-center mb-4'>ข้อมูลสมาชิกทีม</h3>
            </div>
            <Modal scrollable={true} size='lg' show={selectedMember !== undefined} onHide={async () => await close()}>
                <Modal.Header>
                    <Modal.Title>สมาชิก {selectedMember}</Modal.Title>
                    <button onClick={async () => await close()} className='btn btn-icon'><span className='material-icons'>close</span></button>
                </Modal.Header>
                <Modal.Body>
                    <Member setFieldValue={setFieldValue} number={selectedMember} handleChange={handleChange} handleBlur={handleBlur} values={values} />
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn-primary btn'>บันทึกข้อมูล</button>
                </Modal.Footer>
            </Modal>
            {membersElm}
        </div>
    )
}

const Register = () => {
    const [currentStep, setStep] = useState(1)
    const [initVals, setInitVals] = useState({})
    const [user, setUser] = useState(undefined)
    function nextPage() {
        if (currentStep <= 4) {
            setStep(currentStep + 1)
        }
    }
    const db = firebase.firestore().collection('rama-pitching')
    const member_data_name = ['name', 'school', 'image', 'class', 'tel', 'doc']
    var members_data = {}
    for (var i = 0; i <= 3; i++) {
        member_data_name.forEach((name) => {
            members_data[`member_${i + 1}_${name}`] = ''
        })
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setUser(user)
                db.doc('register').collection('teams').doc(user.uid)
                    .onSnapshot((doc) => {
                        if (doc.exists) {
                            setInitVals(doc.data())
                        }
                        else {
                            setInitVals({
                                team_name: '',
                                register_type: '',
                                teacher_name: '',
                                teacher_tel: '',
                                teacher_school: '',
                                ...members_data
                            })
                        }
                        console.log(initVals)
                    })
            }

        })
    }, [])
    return (
        <div className='rounded shadow container bg-white px-4 py-5'>
            <StepBar setStep={(i) => setStep(i)} step={currentStep} />
            <Formik
                enableReinitialize={true}
                initialValues={initVals}
                validate={values => {
                    console.log(values)
                    const errors = {}
                    return errors
                }}
                onSubmit={async (values) => {
                    console.log(user.uid) >
                        await db.doc('register').collection('teams').doc(user.uid).set(values, { merge: true })
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
                                <GeneralInfo setFieldValue={setFieldValue} handleChange={handleChange} handleBlur={handleBlur} values={values} />
                                <Teacher handleChange={handleChange} handleBlur={handleBlur} values={values} />
                            </>
                        }
                        {currentStep === 2 &&
                            <Members setFieldValue={setFieldValue} handleChange={handleChange} handleBlur={handleBlur} values={values} />
                        }
                        {currentStep === 3 &&
                            <Content handleChange={handleChange} handleBlur={handleBlur} values={values} />
                        }
                        <div className='row mt-4'>
                            <div className='col-6'></div>
                            <div className='col-6 text-right'>
                                <button className='text-primary btn btn-light' style={{ minWidth: 150 }} type='submit'>
                                    บันทึกข้อมูล
                                </button>
                                <button onClick={() => nextPage()} className='btn btn-primary' style={{ minWidth: 150 }}>
                                    ต่อไป
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default Register