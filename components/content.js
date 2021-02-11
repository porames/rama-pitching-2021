import React from 'react'
import { ErrorMessage } from 'formik'

const Content = (props) => {
    const { handleBlur, handleChange, values } = props
    return (
        <div className='row'>
            <div className='col-md-3'>
                <h3>รายละเอียดแนวคิด</h3>
            </div>
            <div className='col-md-9'>
                <div className='mb-4'>
                    <label className="form-label">รายงานข้อเสนอ</label>
                    <div className="custom-file">
                        <label className="custom-file-label">เลือกไฟล์</label>
                        <input type="file" className="custom-file-input" />
                    </div>
                </div>
                <div className='mb-4'>
                    <label class="form-label">ลิงค์วีดีโอนำเสนอ</label>
                    <input
                        placeholder='ลิงค์วีดีโอนำเสนอ'
                        className="form-control"
                        type="text"
                        name="team_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.team_name}
                    />
                    <small className='text-muted'><b>อัพโหลดวีดีโอนำเสนอความยาวไม่เกิน 3 นาทีลง YouTube แล้วแนบลิงค์วีดีโอ</b></small>
                    <div className='text-danger error'>
                        <ErrorMessage name="team_name" component="span" />
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Content