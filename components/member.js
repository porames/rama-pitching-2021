import { ErrorMessage } from 'formik'
import { useState } from 'react'
import firebase from './firebase'
const Member = (props) => {
    const { handleBlur, handleChange, values, setFieldValue, number } = props
    const [imagePreview, setImagePreview] = useState(undefined)
    function docPreviewText(data) {
        if (typeof (data) === 'object') {
            return data.name
        }
        else {
            return 'กรุณาเลือกไฟล์'
        }
    }

    function previewImage(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = function (e) {
            setImagePreview(e.target.result)
        }
    }
    function uploadImage(file) {
        previewImage(file)
        const user = firebase.auth().currentUser
        var storageRef = firebase.storage().ref()
        const ext = file.name.split('.').pop()
        storageRef.child(`teams/${user.uid}/member_${number}_image.${ext}`)
        storageRef.put(file)


    }
    return (
        <div className='row'>
            <div className='col-12'>
                <div className='mb-4 text-center'>
                    <label htmlFor={`member_${number}_image`} className="form-label">
                        <div className='text-center flex-y-middle avatar-placeholder'
                            style={{ backgroundImage: imagePreview !== undefined ? `url(${imagePreview})` : '' }}
                        >
                            <span className='material-icons'>
                                add_a_photo
                            </span>
                            <div className='mt-3'>ภาพถ่ายหน้าตรง</div>
                        </div>
                    </label>
                    <input
                        id={`member_${number}_image`}
                        name={`member_${number}_image`}
                        type="file"
                        className="d-none custom-file-input"
                        onChange={(event) => {
                            setFieldValue(`member_${number}_image`, event.currentTarget.files[0])
                            uploadImage(event.currentTarget.files[0])
                        }}
                    />
                </div>
            </div>
            <div className='col-12'>
                <div className='mb-4'>
                    <label className="form-label">ชื่อ-สกุล</label>
                    <input
                        placeholder='ชื่อ-สกุล'
                        className="form-control"
                        type="text"
                        name={`member_${number}_name`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values[`member_${number}_name`]}
                    />
                    <div className='text-danger error'>
                        <ErrorMessage name={`member_${number}_name`} component="span" />
                    </div>
                </div>
                <div className='mb-4'>
                    <div className='row'>
                        <div className='col-6'>
                            <label className="form-label">โรงเรียน</label>
                            <input
                                placeholder='โรงเรียน'
                                className="form-control"
                                type="text"
                                name={`member_${number}_school`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values[`member_${number}_school`]}
                            />
                            <div className='text-danger error'>
                                <ErrorMessage name={`member_${number}_school`} component="span" />
                            </div>
                        </div>
                        <div className='col-6'>

                            <label className="form-label">ระดับชั้น</label>
                            <select
                                className="custom-select"
                                aria-label="ระดับชั้น"
                                name={`member_${number}_class`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values[`member_${number}_class`]}
                            >
                                <option value="" disabled>ระดับชั้น</option>
                                <option value="4">ม.4</option>
                                <option value="5">ม.5</option>
                                <option value="6">ม.6</option>
                            </select>
                            <div className='text-danger error'>
                                <ErrorMessage name="team_name" component="span" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mb-4'>
                    <label className="form-label">ที่อยู่ที่ติดต่อได้</label>
                    <input
                        placeholder='ที่อยู่ที่ติดต่อได้'
                        className="form-control"
                        type="text"
                        name={`member_${number}_address`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values[`member_${number}_address`]}
                    />
                    <div className='text-danger error'>
                        <ErrorMessage name={`member_${number}_address`} component="span" />
                    </div>
                </div>
                <div className='mb-4'>
                    <label className="form-label">เบอร์โทรศัพท์</label>
                    <input
                        placeholder='เบอร์โทรศัพท์'
                        className="form-control"
                        type="text"
                        name={`member_${number}_tel`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values[`member_${number}_tel`]}
                    />
                    <div className='text-danger error'>
                        <ErrorMessage name="team_name" component="span" />
                    </div>
                </div>
                <div className='mb-4'>
                    <label className="form-label">ใบ ปพ.7</label>
                    <div className="custom-file">
                        <label htmlFor={`member_${number}_doc`} className="custom-file-label">{docPreviewText(values[`member_${number}_doc`])}</label>
                        <input type="file" className="custom-file-input"
                            id={`member_${number}_doc`}
                            name={`member_${number}_doc`}
                            onChange={(event) => {
                                setFieldValue(`member_${number}_doc`, event.currentTarget.files[0]);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Member