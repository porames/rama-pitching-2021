import { ErrorMessage } from 'formik'
const Member = (props) => {
    const { handleBlur, handleChange, values } = props
    return (
        <div className='row'>
            <div className='col-md-3'>
                <h3>อาจารย์ประจำทีม</h3>
            </div>
            <div className='col-md-9'>
                <div className='mb-4'>
                    <label class="form-label">ชื่อ-สกุล</label>
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

                    <label class="form-label">โรงเรียน</label>
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
                <div className='mb-4'>
                    <label class="form-label">เบอร์โทรศัพท์</label>
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
            </div>

        </div>
    )
}

export default Member