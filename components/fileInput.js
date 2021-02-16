import React, { useEffect, useState } from 'react'
import FileUpload from './fileUpload'
import firebase from './firebase'
const FileInput = (props) => {
    const { maxSize, setFieldValue, values, name, label, handleSubmit, allowedExt } = props
    const [filePreviewLink, setFilePreviewLink] = useState(undefined)
    const [uploadProgress, setUploadProgress] = useState(undefined)
    function docPreviewText(data) {
        if (typeof (data) === 'object') {
            return data.name
        }
        else {
            return 'กรุณาเลือกไฟล์'
        }
    }
    function displayProgress(progress){
        if(progress){
            if(progress <100){
                return(`กำลังอัพโหลด (${Math.round(uploadProgress*100)/100}%)`)
            }
            else{
                return(<b className='text-success'>อัพโหลดสำเร็จ</b>)
            }
            
        }
        else{
            return('')
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
            <label className="form-label">{label} {displayProgress(uploadProgress)}</label>
            <div className="custom-file">
                <label htmlFor={name} className="custom-file-label">{docPreviewText(values[name])}</label>
                <FileUpload setUploadProgress={setUploadProgress} maxSize={maxSize} allowedExt={allowedExt} handleSubmit={handleSubmit} name={name} setFieldValue={setFieldValue} />
            </div>
            <a href={filePreviewLink} target="_blank">
                <small><b>{filePreviewLink ? 'ดูไฟล์ที่เคยอัพโหลดไว้' : ''}</b></small>
            </a>
        </div>
    )
}
export default FileInput