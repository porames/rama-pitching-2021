import React, { useState, useEffect } from 'react';
import { Formik, ErrorMessage } from 'formik';
import firebase from './firebase'
import { withTranslation } from '../i18'
const LogIn = (props) => {
  const { t, i18n } = props
  const [isRedirecting, setRedirecting] = useState(false)
  return (
    <div className='container page-wrapper'>
      <div className='rounded shadow-sm form-box-container bg-white' style={{ maxWidth: 700 }}>
        <h3 className='text-center'>{t('title')}</h3>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={values => {
            const errors = {}
            return errors
          }}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            try {
              const user = await firebase.auth().signInWithEmailAndPassword(values.email, values.password)
              if (user) {
                setRedirecting(true)
                console.log('logging you in')
              }
            }
            catch (err) {
              setFieldError('password', 'อีเมลหรือรหัสผ่านไม่ถูกต้อง')
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
                <label class="form-label">Email</label>
                <input
                  placeholder='Email'
                  className="form-control"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isRedirecting}
                  value={values.email}
                />
                <div className='text-danger text-bold'>
                  <ErrorMessage name="email" component="span" />
                </div>
              </div>
              <div className='mb-4'>
                <label class="form-label">รหัสผ่าน</label>
                <input
                  placeholder='รหัสผ่าน'
                  className="form-control"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  disabled={isRedirecting}
                />
                <div className='text-danger text-bold'>
                  <ErrorMessage name="password" component="span" />
                </div>
              </div>
              <div className='text-center'>
                <button className='btn btn-primary w-100' type="submit" disabled={isSubmitting || isRedirecting}>
                  เข้าสู่ระบบ
            </button>
                <button onClick={() => props.setMode('register')} className='mt-3 btn btn-link w-100'>
                  ยังไม่เคยลงทะเบียน?
            </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default withTranslation('common')(LogIn)