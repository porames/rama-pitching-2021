import firebase from './firebase'
import { toast } from 'react-toastify'
import React, { useState } from 'react'
const FileUpload = (props) => {
    const { setFieldValue, handleSubmit } = props
    function previewImage(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = function (e) {
            props.setImagePreview(e.target.result)
        }
    }
    function uploadFile(file) {        
        if (file.size > 1024 * 1024 * 2) { 
            toast.error('กรุณาอัพโหลดไฟล์ที่มีขนาดไม่เกิน 2 Mb',{
                autoClose: 4000
            })
            return
        }
        const ext = file.name.split('.').pop().toLowerCase()
        var allowedExt = ['jpg','png','pdf','jpeg']
        if (!allowedExt.includes(ext)) { 
            toast.error('กรุณาอัพโหลดไฟล์สกุล JPG PNG JPEG หรือ PDF เท่านั้น',{
                autoClose: 4000
            })
            return
        }
        if (props.previewImage) {
            previewImage(file)
        }
        const user = firebase.auth().currentUser        
        var storageRef = firebase.storage().ref().child(`teams/${user.uid}/${props.name}.${ext}`)
        const uploadTask = storageRef.put(file)
        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log(progress)
            toast.update('uploadToast', { progress: progress })
        }, (err) => {
            console.log(err)
        }, () => {
            setFieldValue(props.name, `teams/${user.uid}/${props.name}.${ext}`)
            handleSubmit()
        })
    }
    return (
        <input
            id={props.name}
            name={props.name}
            type="file"
            className={`${props.className} custom-file-input`}
            onChange={async (e) => {
                uploadFile(e.currentTarget.files[0])
            }}
        />
    )
}

export default FileUpload