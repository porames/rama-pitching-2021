import { ErrorMessage } from 'formik'
const Member = (props) => {
    const { handleBlur, handleChange, values } = props
    return (
        <div className='row'>
            <div className='col-12'>
                <div className='mb-4'>
                    <label className="form-label">ชื่อ-สกุล</label>
                    <input
                        placeholder='ชื่อ-สกุล'
                        className="form-control"
                        type="text"
                        name="team_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.team_name}
                    />
                    <div className='text-danger error'>
                        <ErrorMessage name="team_name" component="span" />
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
                                name="team_name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.team_name}
                            />
                            <div className='text-danger error'>
                                <ErrorMessage name="team_name" component="span" />
                            </div>
                        </div>
                        <div className='col-6'>
                            <label className="form-label">ระดับชั้น</label>
                            <input
                                placeholder='ระดับชั้น'
                                className="form-control"
                                type="text"
                                name="team_name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.team_name}
                            />
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
                        name="team_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.team_name}
                    />
                    <div className='text-danger error'>
                        <ErrorMessage name="team_name" component="span" />
                    </div>
                </div>
                <div className='mb-4'>
                    <label className="form-label">เบอร์โทรศัพท์</label>
                    <input
                        placeholder='เบอร์โทรศัพท์'
                        className="form-control"
                        type="text"
                        name="team_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.team_name}
                    />
                    <div className='text-danger error'>
                        <ErrorMessage name="team_name" component="span" />
                    </div>
                </div>
                <div className='mb-4'>
                    <label className="form-label">ภาพถ่ายหน้าตรง</label>
                    <div className="custom-file">
                        <label className="custom-file-label">เลือกรูปภาพ</label>
                        <input type="file" className="custom-file-input" />
                    </div>
                </div>
                <div className='mb-4'>
                    <label className="form-label">ใบ ปพ.7</label>
                    <div className="custom-file">
                        <label className="custom-file-label">เลือกไฟล์</label>
                        <input type="file" className="custom-file-input" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Member