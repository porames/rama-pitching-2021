import React, { useEffect, useState } from 'react'
import firebase from './firebase'

const StorageLink = (props) => {
    const { path } = props
    const [link, setLink] = useState(undefined)
    useEffect(async () => {
        const fileURL = await firebase.storage().ref().child(path).getDownloadURL()
        console.log(fileURL)
        setLink(fileURL)
    }, [])
    return (
        <a href={link} target='_blank'> ดูไฟล์ที่อัพโหลด <span className='material-icons small'>launch</span></a>
    )
}

const PreviewData = (props) => {
    const { values, checkMembers } = props
    const [memberDataElm, setMemberDataElm] = useState(undefined)
    const member_data_name = [
        ['name', 'ชื่อ-สกุล'],
        ['school', 'โรงเรียน'],
        ['class', 'ระดับชั้น ม.'],
        ['tel', 'เบอร์โทรศัพท์'],
        ['image', 'รูปภาพ'],
        ['doc', 'ใบ ปพ.7']
    ]

    async function renderMemberData() {
        var elm = []
        for (var i = 0; i < 3; i++) {
            if (checkMembers[i]) {
                elm.push(<br />)
                elm.push(<h5>สมาชิก {i + 1}</h5>)
                for (const name of member_data_name) {
                    const fieldValue = values[`member_${i + 1}_${name[0]}`]
                    const fieldLabel = name[1]
                    if (name[0] === 'image' || name[0] === 'doc') {
                        
                        elm.push(
                            <div><b>{fieldLabel}</b> <StorageLink path={fieldValue}/>
                            </div>
                        )
                    }
                    else {
                        elm.push(<div><b>{fieldLabel}</b> {fieldValue}</div>)
                    }

                }
            }
        }
        setMemberDataElm(elm)
    }
    useEffect(async () => {
        await renderMemberData()
    })
    return (
        <div className='alert alert-dark mt-3' style={{ maxHeight: 240, overflowY: 'auto' }}>
            <div>
                <div><b>Email</b> {firebase.auth().currentUser.email}</div>
                <div><b>ชื่อทีม</b> {values['team_name']}</div>
                <div><b>รูปแบบการแข่งขัน</b> {values['register_type']}</div>
                <br />
                <h5>อาจารย์ประจำทีม</h5>
                <div><b>ชื่อ-สกุล</b> {values['teacher_name']}</div>
                <div><b>โรงเรียน</b> {values['teacher_school']}</div>
                <div><b>เบอร์โทรศัพท์</b> {values['teacher_tel']}</div>
                {memberDataElm}
                <br />
                <h5>ข้อมูลแนวคิด</h5>
                {values['register_type'] === 'poster' &&
                    <div><b>ไฟล์โปสเตอร์นำเสนอ</b> <StorageLink path={values['team_poster']} /></div>
                }
                {values['register_type'] !== 'poster' &&
                    <span>
                        <div><b>รายงานข้อเสนอ</b> <StorageLink path={values['team_doc']} /></div>

                        <div><b>ลิงค์วีดีโอนำเสนอ</b> <a href={values['video_url']} target='_blank'>ดูไฟล์ที่อัพโหลด <span className='material-icons small'>launch</span></a></div>
                    </span>
                }

            </div>
        </div>
    )
}
export default PreviewData