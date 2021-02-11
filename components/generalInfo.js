import { ErrorMessage } from 'formik'
const GeneralInfo = (props) => {
    const { handleBlur, handleChange, values } = props
    return (
        <div className='row'>
            <div className='col-md-3'>
                <h3>ข้อมูลทั่วไป</h3>
            </div>
            <div className='col-md-9'>
                <div className='mb-4'>
                    <label class="form-label">ชื่อทีม</label>
                    <input
                        placeholder='ชื่อทีม'
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
                    <label class="form-label">ประเภทการสมัคร</label>
                    <div class="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="register-type"
                            value='management'
                        />
                        <label class="form-check-label" for="management">
                            Healthcare Management
                            </label>
                    </div>
                    <div class="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="register-type"
                            value='innovation'
                        />
                        <label class="form-check-label" for="management">
                            Innovation
                                </label>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default GeneralInfo