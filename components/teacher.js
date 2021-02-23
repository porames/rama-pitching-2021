import { ErrorMessage } from 'formik'
import {withTranslation} from '../i18'
const Member = (props) => {
    const { handleBlur, handleChange, values, t } = props
    return (
        <div className='row'>
            <div className='col-md-3'>
                <h3>{t('teacher-info')}</h3>
            </div>
            <div className='col-md-9'>
                <div className='mb-4'>
                    <label class="form-label">{t('label.name')}</label>
                    <input
                        placeholder='ชื่อ-สกุล'
                        className="form-control"
                        type="text"
                        name="teacher_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.teacher_name}
                    />
                    <div className='text-danger error'>
                        <ErrorMessage name="teacher_name" component="span" />
                    </div>
                </div>
                <div className='mb-4'>

                    <label class="form-label">{t('label.school-name')}</label>
                    <input
                        placeholder={t('label.school-name')}
                        className="form-control"
                        type="text"
                        name="teacher_school"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.teacher_school}
                    />
                    <div className='text-danger error'>
                        <ErrorMessage name="teacher_school_name" component="span" />
                    </div>
                </div>
                <div className='mb-4'>
                    <label class="form-label">{t('label.tel')}</label>
                    <input
                        placeholder={t('label.tel')}
                        className="form-control"
                        type="text"
                        name="teacher_tel"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.teacher_tel}
                    />
                    <div className='text-danger error'>
                        <ErrorMessage name="teacher_tel" component="span" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default withTranslation('common')(Member)