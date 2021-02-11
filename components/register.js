import React from 'react';
import { Formik, ErrorMessage } from 'formik';
import firebase from './firebase'

const Register = () => (
  <div className='rounded shadow-sm form-box-container bg-white' style={{ maxWidth: 700 }}>
    <h3 className='text-center'>ลงทะเบียนร่วมการแข่งขัน</h3>
    <Formik
      initialValues={{ email: '', password: '', confirmed_password: '' }}
      validate={values => {
        const errors = {}
        if (!values.email) {
          errors.email = 'กรุณาระบุ Email'
        }
        else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Email รูปแบบไม่ถูกต้อง'
        }
        if (!values.password) {
          errors.password = 'กรุณาตั้งรหัสผ่านความยาวไม่น้อยกว่า 8 ตัวอักษร'
        }
        else {
          if (values.password.length >= 8) {
            if (values.password !== values.confirmed_password && values.confirmed_password) {
              errors.confirmed_password = 'รหัสผ่านไม่ตรงกัน'
            }
          }
          else {
            errors.password = 'กรุณาตั้งรหัสผ่านความยาวไม่น้อยกว่า 8 ตัวอักษร'
          }
        }
        return errors
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const user = await firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
          console.log(user)
        }
        catch(err){
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
              value={values.email}
            />
            <span className='text-muted'>Email ประจำทีม สำหรับใช้รับข้อมูลการแข่งขัน</span>
            <div className='text-danger error'>
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
            />
            <div className='text-danger error'>
              <ErrorMessage name="password" component="span" />
            </div>
          </div>
          <div className='mb-4'>
          
            <label class="form-label">ยืนยันรหัสผ่าน</label>
            <input
              placeholder='ยืนยันรหัสผ่าน'
              className="form-control"
              type="password"
              name="confirmed_password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmed_password}
            />
            
            <div className='text-danger error'>
              <ErrorMessage name="confirmed_password" component="span" />
            </div>
          </div>
          <div className='text-center'>
            <button className='btn btn-primary w-100' type="submit" disabled={isSubmitting}>
              ลงทะเบียน
          </button>
          </div>
        </form>
      )}
    </Formik>
  </div>
);

export default Register