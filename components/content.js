import React from 'react'
import { ErrorMessage } from 'formik'
import FileInput from './fileInput'
import { withTranslation } from '../i18'

const Content = (props) => {
    const { handleBlur, handleChange, t, values, setFieldValue, handleSubmit } = props
    function extractWatchId(url) {
        var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[2].length == 11) {
            console.log(match[2])
            return match[2];
        } else {
            return false
        }
    }
    return (
        <div className='row'>
            <div className='col-md-3'>
                <h3>{t('pitching-idea')}</h3>
            </div>
            
                <div className='col-md-9'>
                    <FileInput
                        label={t('label.pitching-paper')}
                        handleSubmit={handleSubmit}
                        allowedExt={['pdf']}
                        setFieldValue={setFieldValue}
                        values={values}
                        name={`team_doc`}
                    />
                    <div className='mb-4'>
                        <label class="form-label">{t('label.presentation-vdo')}</label>
                        <input
                            placeholder={t('label.presentation-vdo')}
                            className="form-control"
                            type="text"
                            name="video_url"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.video_url}
                        />
                        <small className='text-muted'><b>{t('vdo-helper')}</b></small>
                        <div className='text-danger error'>
                            <ErrorMessage name="video_url" component="span" />
                        </div>
                    </div>
                    {extractWatchId(values.video_url) &&
                        <div className="video-container col-lg-6">
                            <iframe src={`https://www.youtube.com/embed/${extractWatchId(values.video_url)}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    }
                    {(!extractWatchId(values.video_url) && values.video_url) &&
                        <p className='text-danger'><b>{t('warning.youtube-format')}</b></p>
                    }
                </div>
        </div>

    )
}
export default withTranslation('common')(Content)