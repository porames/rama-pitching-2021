import React, { useState, useEffect } from 'react'
import { Formik, ErrorMessage } from 'formik'
import firebase from './firebase'
import Member from './member'
import Teacher from './teacher'
import GeneralInfo from './generalInfo'
import StepBar from './stepBar'
import Modal from 'react-bootstrap/Modal'

const Members = (props) => {
    const { handleChange, values, handleBlur } = props
    const [selectedMember, setSelectedMember] = useState(undefined)
    return (
        <div className='row'>
            <Modal size='lg' show={selectedMember !== undefined} onHide={() => setSelectedMember(undefined)}>

                <Modal.Header>
                    <Modal.Title>สมาชิก {selectedMember}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Member number={1} handleChange={handleChange} handleBlur={handleBlur} values={values} />
                </Modal.Body>
            </Modal>
            <div className='col-4'>
                <button onClick={() => setSelectedMember(1)} className='btn py-4 w-100'>
                    <div className='flex-y-middle'>
                        <div className='avatar mb-3' />
                        <h5>สมาชิก 1</h5>
                        <div className='text-left'>
                            <div>ข้อมูล</div>
                            <div>ภาพถ่าย</div>
                            <div>ปพ. 7</div>
                        </div>
                    </div>
                </button>
            </div>
            <div className='col-4'>
                <button className='btn py-4 w-100'>
                    <div className='flex-y-middle'>
                        <div className='avatar mb-3' />
                        <h5>สมาชิก 1</h5>
                        <div className='text-left'>
                            <div>ข้อมูล</div>
                            <div>ภาพถ่าย</div>
                            <div>ปพ. 7</div>
                        </div>
                    </div>
                </button>
            </div>
            <div className='col-4'>
                <button className='btn py-4 w-100'>
                    <div className='flex-y-middle'>
                        <div className='avatar mb-3' />
                        <h5>สมาชิก 1</h5>
                        <div className='text-left'>
                            <div>ข้อมูล</div>
                            <div>ภาพถ่าย</div>
                            <div>ปพ. 7</div>
                        </div>
                    </div>
                </button>
            </div>

        </div>
    )
}

const Register = () => {
    const [currentStep, setStep] = useState(1)
    function nextPage(){
        if(currentStep<=4){
            setStep(currentStep+1)
        }
    }
    return (
        <div className='container py-5'>
            <StepBar setStep={(i) => setStep(i)} step={currentStep} />
            <Formik
                initialValues={{ email: '', password: '', confirmed_password: '' }}
                validate={values => {
                    const errors = {}
                    return errors
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
                    /* and other goodies */
                }) => (
                    <form className='mt-4' onSubmit={handleSubmit}>
                        {currentStep === 1 &&
                            <>
                                <GeneralInfo handleChange={handleChange} handleBlur={handleBlur} values={values} />
                                <Teacher handleChange={handleChange} handleBlur={handleBlur} values={values} />
                            </>
                        }
                        {currentStep === 2 &&
                            <Members handleChange={handleChange} handleBlur={handleBlur} values={values} />
                        }
                        <div className='row mt-4'>
                            <div className='col-6'></div>
                            <div className='col-6 text-right'>
                                <button className='text-primary btn btn-light' style={{ minWidth: 150 }}>
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