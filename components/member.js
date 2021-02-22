import { ErrorMessage } from 'formik'
import { useState, useEffect } from 'react'
import ImageUploader from './imageUploader'
import FileInput from './fileInput'

const TextField = (props) => {
    const { handleBlur, handleChange, values } = props
    return (
        <div className='mb-4'>
            <label className="form-label">{props.label}</label>
            <input
                placeholder={props.label}
                className="form-control"
                type="text"
                name={props.name}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values[props.name]}
            />
            <div className='text-danger error'>
                <ErrorMessage name={props.name} component="span" />
            </div>
        </div>
    )
}

const Member = (props) => {
    const { handleBlur, handleChange, values, setFieldValue, number, handleSubmit } = props
    return (
        <div className='row'>

            <div className='col-12'>
                <ImageUploader handleSubmit={handleSubmit} values={values} setFieldValue={setFieldValue} name={`member_${number}_image`} />
            </div>
            <div className='col-12'>
                <TextField values={values} label='ชื่อ-สกุล' name={`member_${number}_name`} handleChange={handleChange} handleBlur={handleBlur} />
                <TextField values={values} label='Email ส่วนตัว' name={`member_${number}_email`} handleChange={handleChange} handleBlur={handleBlur} />
                <div className='row'>
                    <div className='col-6'>
                        <TextField values={values} label='โรงเรียน' name={`member_${number}_school`} handleChange={handleChange} handleBlur={handleBlur} />
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
                <TextField values={values} label='ที่อยู่ที่ติดต่อได้' name={`member_${number}_address`} handleChange={handleChange} handleBlur={handleBlur} />
                <TextField values={values} label='เบอร์โทรศัพท์' name={`member_${number}_tel`} handleChange={handleChange} handleBlur={handleBlur} />                
                <FileInput
                    label='ใบ ปพ.7'
                    handleSubmit={handleSubmit}
                    allowedExt={['pdf', 'jpg', 'jpeg', 'png']}
                    setFieldValue={setFieldValue} values={values} name={`member_${number}_doc`}
                />
            </div>
        </div>
    )
}

export default Member