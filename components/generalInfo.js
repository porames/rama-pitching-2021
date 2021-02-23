import { ErrorMessage } from 'formik'
import { withTranslation } from '../i18'

const GeneralInfo = (props) => {
    const { t, handleBlur, handleChange, values, setFieldValue } = props
    return (
        <div className='row'>
            <div className='col-md-3'>
                <h3>{t('general-info')}</h3>
            </div>
            <div className='col-md-9'>
                <div className='mb-4'>
                    <label className="form-label">Email</label>
                    <input
                        placeholder='Email'
                        disabled={true}
                        className="form-control"
                        value={props.email}
                    />
                </div>
                <div className='mb-4'>
                    <label className="form-label">{t('label.team-name')}</label>
                    <input
                        placeholder={t('label.team-name')}
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
                <h3>{t('label.register-type')}</h3>
            </div>
            <div className='col-md-9'>
                <div className='mb-4'>
                    <div className='row'>
                        <div className='col-6'>
                            <div className={`${values['register_type'] == 'management' ? 'elevation-1' : ''} h-100 card rounded p-3 flex-y-middle`}>
                                <img src='/hospital.svg' height='100px' />
                                <div>
                                    <div className="mt-3 form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="register_type"
                                            value='management'
                                            id='management-radio'
                                            checked={values['register_type'] == 'management'}
                                            onChange={() => setFieldValue("register_type", "management")}
                                        />
                                        <label className="form-check-label" htmlFor="management-radio">{t('management')}</label>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className={`${values['register_type'] == 'innovation' ? 'elevation-1' : ''} h-100 card rounded p-3 flex-y-middle`}>
                                <img src='/ai.svg' height='100px' />
                                <div className="mt-3 form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="register_type"
                                        value='innovation'
                                        id='innovation-radio'
                                        checked={values['register_type'] == 'innovation'}
                                        onChange={() => setFieldValue("register_type", "innovation")}
                                    />
                                    <label className="form-check-label" htmlFor='innovation-radio'>{t('innovation')}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
export default withTranslation('common')(GeneralInfo)