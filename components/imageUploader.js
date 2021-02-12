import React, { useEffect, useState } from 'react'
import FileUpload from './fileUpload'
import firebase from './firebase'
const ImageUploader = (props) => {
    const { setFieldValue, values, handleSubmit } = props
    const [imagePreview, setImagePreview] = useState(undefined)
    useEffect(async () => {
        const path = values[props.name]
        console.log('==>', path)
        if (path) {
            const fileURL = await firebase.storage().ref().child(path).getDownloadURL()
            setImagePreview(fileURL)
        }
    }, [values[props.name]])
    return (
        <div className='mb-4 text-center'>
            <label htmlFor={props.name} className="form-label">
                <div className='text-center flex-y-middle avatar-placeholder'
                    style={{ backgroundImage: imagePreview !== undefined ? `url(${imagePreview})` : '' }}
                >
                    <span className='material-icons'>
                        add_a_photo
                            </span>
                    <div className='mt-3'>ภาพถ่ายหน้าตรง</div>
                </div>
            </label>
            <FileUpload
                name={props.name}
                setFieldValue={setFieldValue}
                previewImage={true}
                setImagePreview={setImagePreview}
                handleSubmit={handleSubmit}
                className='d-none'
                allowedExt={['jpg', 'png', 'jpeg']}
            />
        </div>
    )
}

export default ImageUploader