import React, { useEffect, useState } from 'react'
import _ from 'lodash'

import Modal from 'react-bootstrap/Modal'
import Router from 'next/router'

import firebase from './firebase'
import PreviewData from './previewData'

const ConfirmModal = (props) => (
    <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header>
            <Modal.Title>ยืนยันการส่งใบสมัคร</Modal.Title>
            <button onClick={props.handleClose} className='btn btn-icon'><span className='material-icons'>close</span></button>
        </Modal.Header>
        <Modal.Body>
            <span>
                การกดปุ่มยืนยันการส่งใบสมัครหมายความว่าผู้สมัครได้ตรวจสอบข้อมูลว่าถูกต้องและครบถ้วนแล้ว 
                หลังจากส่งใบสมัคร ผู้สมัครจะไม่สามารถแก้ไขข้อมูลได้อีก

            </span>
        </Modal.Body>
        <Modal.Footer>
        <button className='btn btn-white text-primary' onClick={props.handleClose}>กลับไปแก้ไข</button>
            <button className='btn btn-primary' onClick={()=>props.submitApp()}>ยืนยันการส่งใบสมัคร</button>
            
        </Modal.Footer>
    </Modal>
)

const Success = () => (<span className="material-icons">check_circle_outline</span>)
const Warning = () => (<span className="material-icons">error_outline</span>)

const SuccessCard = (props) => (
    <div className='card h-100 elevation-1 bg-success text-white text-center py-4'>
        <h4>{props.name}</h4>
        {!props.member &&
            <p className='mb-0'><b><Success /> ข้อมูลครบถ้วน</b></p>
        }
        {props.member && props.children
        }
    </div>
)

const WarningCard = (props) => (
    <div className='card h-100 elevation-1 bg-danger text-white text-center py-4'>
        <h4>{props.name}</h4>
        {!props.member &&
            <p className='mb-0'><b><Warning /> ข้อมูลยังไม่ครบ</b></p>
        }
        {props.member && props.children}
    </div>
)

const Submission = (props) => {
    const { values, handleSubmit } = props
    const [submissionCheck, setSubmissionCheck] = useState(false)
    const [showModal, setShowModal] = useState(false)
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
    var unfinished = []
    for (const i in valueKeys) {
        const key = valueKeys[i]
        if (!values[key] || values[key] == '') {
            unfinished.push(key)
        }
    }
    function checkGenInfo() {
        const genInfoKeys = ['team_name', 'teacher_name', 'register_type', 'teacher_school', 'teacher_tel']
        const intersect = _.intersection(unfinished, genInfoKeys)
        if (intersect.length > 0) {
            return false
        }
        else {
            return true
        }
    }

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

    async function submitApp() {
        console.log(values)
        const db = firebase.firestore()
        const user = firebase.auth().currentUser
        await db.collection('rama-pitching').doc('register')
            .collection('teams').doc(user.uid)
            .set({ submission_time: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true })
        return Router.push('application/submitted')
    }

    function renderCheckMembersElm() {
        var checkMembersElm = []
        for (var i = 0; i < 3; i++) {
            var member = []
            member_data_name.forEach((name) => {
                member.push(`member_${i + 1}_${name}`)
            })
            const intersect = _.intersection(member, unfinished)
            if (intersect.length === 0) {
                checkMembersElm.push(<span><Success /> สมาชิก {i + 1}</span>)
            }
            else {
                checkMembersElm.push(<span style={{ opacity: 0.7 }}><Warning /> สมาชิก {i + 1}</span>)
            }
        }
        return checkMembersElm
    }
    function checkContent() {
        if (!values['register_type']) {
            return false
        }
        if (values['register_type'] === 'innovation' || values['register_type'] === 'management') {
            if (values['team_doc'] && values['video_url']) {
                return true
            }

            else {
                return false
            }
        }
        else if (values['register_type'] === 'poster') {
            if (values['team_poster']) {
                return true
            }

            else {
                return false
            }
        }
        else {
            return false
        }
    }

    useEffect(() => {
        handleSubmit()
    }, [])
    return (
        <div className='mb-3'>
            <ConfirmModal submitApp={submitApp} handleClose={()=>setShowModal(false)} show={showModal} />
            <h3 className='text-center mb-4'>ยืนยันการสมัคร</h3>
            <div className='row'>
                <div className='col-md-4 pb-3'>
                    {checkGenInfo() ?
                        <SuccessCard name='ข้อมูลทั่วไป' /> :
                        <WarningCard name='ข้อมูลทั่วไป' />
                    }
                </div>
                <div className='col-md-4 text-bold pb-3'>
                    {checkMembers().includes(true) ?
                        <SuccessCard member name='ข้อมูลสมาชิก'>
                            {renderCheckMembersElm()}
                        </SuccessCard>
                        :
                        <WarningCard member name='ข้อมูลสมาชิก'>
                            {renderCheckMembersElm()}
                        </WarningCard>
                    }
                </div>
                <div className='col-md-4 pb-3'>
                    {checkContent() ?
                        <SuccessCard name='ข้อมูลแนวคิด' /> :
                        <WarningCard name='ข้อมูลแนวคิด' />
                    }
                </div>
            </div>
            <PreviewData checkMembers={checkMembers()} values={values} />
            <div className='text-center mt-3'>
                <div className='custom-control custom-checkbox'>
                    <input
                        disabled={(checkGenInfo() && checkContent() && checkMembers().includes(true)) === false}
                        type='checkbox'
                        className='custom-control-input'
                        id='confirm_register'
                        onChange={() => setSubmissionCheck(!submissionCheck)}
                        name='submission_check'
                        value={submissionCheck}
                    />
                    <label className='custom-control-label' for='confirm_register'>ผู้สมัครได้ตรวจสอบข้อมูลว่าถูกต้องครบถ้วนแล้ว</label>
                </div>
                <button onClick={()=>setShowModal(true)} disabled={!submissionCheck} className='mt-3 btn btn-primary' type='button'>
                    ส่งใบสมัคร
                </button>
            </div>
        </div>
    )
}
export default Submission