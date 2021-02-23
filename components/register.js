import React, { useState, useEffect } from 'react'
import { Formik, ErrorMessage } from 'formik'
import firebase from './firebase'
import { withTranslation} from '../i18'
import LanguageSwitcher from './languageSwitcher'
const Register = (props) => {
  const { t } = props
  return (
    <div className='container page-wrapper'>
      <div className='rounded shadow-sm form-box-container bg-white' style={{ maxWidth: 700 }}>
        <h3 className='text-center'>{t('title')}</h3>
        <Formik
          initialValues={{ email: '', password: '', confirmed_password: '' }}
          validate={values => {
            const errors = {}
            if (!values.email) {
              errors.email = t('error.email-null')
            }
            else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = t('error.email-format')
            }
            if (!values.password) {
              errors.password = t('error.password-length')
            }
            else {
              if (values.password.length >= 8) {
                if (values.password !== values.confirmed_password && values.confirmed_password) {
                  errors.confirmed_password = t('error.password-match')
                }
              }
              else {
                errors.password = t('error.password-length')
              }
            }
            return errors
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const user = await firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
            }
            catch (err) {
              console.log(err)
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form className='mt-4' onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label className="form-label">Email</label>
                <input
                  placeholder='Email'
                  className="form-control"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <small className='text-muted'><b>{t('email-helper')}</b></small>
                <div className='text-danger text-bold'>
                  <ErrorMessage name="email" component="span" />
                </div>
              </div>
              <div className='mb-4'>
                <label className="form-label">{t('label.password')}</label>
                <input
                  placeholder={t('label.password')}
                  className="form-control"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <div className='text-danger text-bold'>
                  <ErrorMessage name="password" component="span" />
                </div>
              </div>
              <div className='mb-4'>

                <label className="form-label">{t('label.confirm-password')}</label>
                <input
                  placeholder={t('label.confirm-password')}
                  className="form-control"
                  type="password"
                  name="confirmed_password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmed_password}
                />

                <div className='text-danger text-bold'>
                  <ErrorMessage name="confirmed_password" component="span" />
                </div>
              </div>
              <div className='text-center'>
                <button className='btn btn-primary w-100' type="submit" disabled={isSubmitting}>
                  {t('label.register')}
                </button>
                <button onClick={() => props.setMode('login')} className='mt-3 btn btn-link w-100'>
                  {t('label.go-login')}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <LanguageSwitcher/>
    </div >
  )
}

export default withTranslation('register')(Register)