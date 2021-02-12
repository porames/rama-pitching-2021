import React, { useEffect, useState } from 'react'
import FileUpload from './fileUpload'
import firebase from './firebase'
const FileInput = (props) => {
    const { setFieldValue, values, name, label, handleSubmit } = props
    const [filePreviewLink, setFilePreviewLink] = useState(undefined)
    function docPreviewText(data) {
        if (typeof (data) === 'object') {
            return data.name
        }
        else {
            return 'กรุณาเลือกไฟล์'
        }
    }
    useEffect(async () => {
        const path = values[name]
        if (path) {
            const fileURL = await firebase.storage().ref().child(path).getDownloadURL()
            setFilePreviewLink(fileURL)
        }
    }, [values[name]])
    return (
        <div className='mb-4'>
            <label className="form-label">{label}</label>
            <div className="custom-file">
                <label htmlFor={name} className="custom-file-label">{docPreviewText(values[name])}</label>
                <FileUpload handleSubmit={handleSubmit} name={name} setFieldValue={setFieldValue} />
            </div>
            <a href={filePreviewLink} target="_blank">
                <small><b>{filePreviewLink ? 'ดูไฟล์ที่เคยอัพโหลดไว้' : ''}</b></small>
            </a>
        </div>
    )
}
export default FileInput