import React from 'react'
import { i18n } from '../i18'

const LanguageSwitcher = () =>
(
    <div className='text-center mt-4 rounded shadow-sm w-100' style={{ maxWidth: 700, backgroundColor: '#ccc', margin: 'auto' }}>
        {i18n.language === 'en' &&
            <button onClick={() => i18n.changeLanguage('th')} className='btn btn-link text-dark'><span className='material-icons'>language</span> เปลี่ยนเป็นภาษาไทย</button>
        }
        {i18n.language === 'th' &&
            <button onClick={() => i18n.changeLanguage('en')} className='btn btn-link text-dark'><span className='material-icons'>language</span> Switch to English Language</button>
        }
    </div>
)

export default LanguageSwitcher