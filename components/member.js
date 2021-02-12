import { ErrorMessage } from 'formik'
import { useState, useEffect } from 'react'
import firebase from './firebase'
import FileUpload from './fileUpload'
import ImageUploader from './imageUploader'
import FileInput from './fileInput'

const Member = (props) => {
    const { handleBlur, handleChange, values, setFieldValue, number, handleSubmit } = props
    useEffect(() => {

    })
    return (
        <div className='row'>

            <div className='col-12'>
                <ImageUploader handleSubmit={handleSubmit} values={values} setFieldValue={setFieldValue} name={`member_${number}_image`} />
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
                <FileInput
                    label='ใบ ปพ.7'
                    handleSubmit={handleSubmit}
                    setFieldValue={setFieldValue} values={values} name={`member_${number}_doc`}
                />
            </div>
        </div>
    )
}

export default Member