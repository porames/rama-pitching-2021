import { withTranslation } from '../i18'

const StepBar = ({setStep, t, step}) => (
    <div className="w-100 mb-5">
        <ul className="progressbar">
            <li onClick={()=>setStep(1)}
                className={`${step >= 1 ? 'active' : ''}`}
            >
                <span className='text-bold'>{t('step.team-info')}</span>
            </li>
            <li onClick={()=>setStep(2)}
                className={`${step >= 2 ? 'active' : ''}`}>
                <span className='text-bold'>{t('step.member-info')}</span>
            </li>
            <li onClick={()=>setStep(3)}
                className={`${step >= 3 ? 'active' : ''}`}>
                <span className='text-bold'>{t('step.content-info')}</span>
            </li>
            <li onClick={()=>setStep(4)}
                className={`${step >= 4 ? 'active' : ''}`}>
                <span className='text-bold'>{t('step.submit-info')}</span>
            </li>
        </ul>
    </div>
)

export default withTranslation('common')(StepBar)