import Head from 'next/head'
import firebase from '../../components/firebase'
import PreviewData from '../../components/previewData'
import React, { useState, useEffect } from 'react'
import _ from 'lodash'

export default function SubmittedPage() {
    const [userData, setData] = useState(undefined)
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
                            if (!data['submission_time']) {
                                if (typeof (variable) !== 'undefined') {
                                    return window.location.replace('/application')
                                }
                            }
                            else {
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
                        }
                        else {
                            if (typeof (variable) !== 'undefined') {
                                return window.location.replace('/application')
                            }
                        }
                    })
            } else {
                if (typeof (variable) !== 'undefined') {
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
                        ระบบรับสมัคร
          </h4>
                    <button onClick={async () => await firebase.auth().signOut()} className='btn btn-icon text-muted'>
                        <span className='material-icons'>logout</span> ออกจากระบบ
                    </button>
                </div>
            </nav>
            <div className='bg-dark page-wrapper'>
                <div className='container' style={{ maxWidth: 700 }}>
                    <div className='rounded shadow-sm form-box-container bg-white'>
                        <h3 className='text-center'>สมัครสำเร็จ</h3>
                        {userData &&
                            <div>
                                <p className='text-center'>ส่งใบสมัครเมื่อ {userData['submission_time'].toDate().toLocaleString()}</p>
                                <PreviewData checkMembers={checkMembers()} values={userData} />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
