import { ErrorMessage } from 'formik'

const GeneralInfo = (props) => {
    const { handleBlur, handleChange, values, setFieldValue } = props
    return (
        <div className='row'>
            <div className='col-md-3'>
                <h3>ข้อมูลทั่วไป</h3>
            </div>
            <div className='col-md-9'>
                <div className='mb-4'>
                    <label class="form-label">Email</label>
                    <input
                        placeholder='Email'
                        disabled={true}
                        className="form-control"
                        value={props.email}
                    />
                </div>
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
            </div>
            <div className='col-md-3'>
                <h3>รูปแบบการแข่งขัน</h3>
            </div>
            <div className='col-md-9'>
                <div className='mb-4'>
                    <div className='row'>
                        <div className='col-6'>
                            <div className={`${values['register_type'] == 'innovation' || values['register_type'] == 'management' ? 'elevation-1' : ''} h-100 card rounded p-3 flex-y-middle`}>
                                <img src='/pitching.svg' height='100px' />
                                <h5 className='mt-3'>Pitching</h5>
                                <div>
                                    <div class="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="register_type"
                                            value='management'
                                            id='management-radio'
                                            checked={values['register_type'] == 'management'}
                                            onChange={() => setFieldValue("register_type", "management")}
                                        />
                                        <label class="form-check-label" htmlFor="management-radio">Healthcare Management</label>
                                    </div>
                                    <div class="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="register_type"
                                            value='innovation'
                                            id='innovation-radio'
                                            checked={values['register_type'] == 'innovation'}
                                            onChange={() => setFieldValue("register_type", "innovation")}
                                        />
                                        <label class="form-check-label" htmlFor='innovation-radio'>Health Innovation</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className={`${values['register_type'] == 'poster' ? 'elevation-1' : ''} h-100 card rounded p-3 flex-y-middle`}>
                                <img src='/presentation.svg' height='100px' />
                                <h5 className='mt-3'>นำเสนอโปสเตอร์</h5>
                                <div class="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="register_type"
                                        value='poster'
                                        id='poster-radio'
                                        checked={values['register_type'] == 'poster'}
                                        onChange={() => setFieldValue("register_type", "poster")}
                                    />
                                    <label class="form-check-label" htmlFor="poster-radio">
                                        นำเสนอโปสเตอร์
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
export default GeneralInfo