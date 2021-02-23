import React, { useEffect, useState } from 'react'
import { withTranslation } from '../i18'
import FileUpload from './fileUpload'
import firebase from './firebase'

const FileInput = (props) => {
    const { t, helper, maxSize, setFieldValue, values, name, label, handleSubmit, allowedExt } = props
    const [filePreviewLink, setFilePreviewLink] = useState(undefined)
    const [uploadProgress, setUploadProgress] = useState(undefined)
    function docPreviewText(data) {
        if (typeof (data) === 'object') {
            return data.name
        }
        else {
            return t('please-select-file')
        }
    }
    function displayProgress(progress) {
        if (progress) {
            if (progress < 100) {
                return (`${t('uploading')} (${Math.round(uploadProgress * 100) / 100}%)`)
            }
            else {
                return (<b className='text-success'>{t('upload-success')}</b>)
            }

        }
        else {
            return ('')
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
                <FileUpload t={t} setUploadProgress={setUploadProgress} maxSize={maxSize} allowedExt={allowedExt} handleSubmit={handleSubmit} name={name} setFieldValue={setFieldValue} />
            </div>
            {helper &&
                <div>
                    <small><b className='text-muted'>{helper}</b></small>
                </div>
            }
            <div>
                <a href={filePreviewLink} target="_blank">
                    <small><b>{filePreviewLink ? t('view-upload') : ''}</b></small>
                </a>
            </div>
        </div>
    )
}
export default withTranslation('common')(FileInput)