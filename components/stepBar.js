const StepBar = (props) => (
    <div className="w-100 mb-5">
        <ul className="progressbar">
            <li onClick={()=>props.setStep(1)}
                className={`${props.step >= 1 ? 'active' : ''}`}
            >
                <span className='text-bold'>ข้อมูลทีม</span>
            </li>
            <li onClick={()=>props.setStep(2)}
                className={`${props.step >= 2 ? 'active' : ''}`}>
                <span className='text-bold'>สมาชิก</span>
            </li>
            <li onClick={()=>props.setStep(3)}
                className={`${props.step >= 3 ? 'active' : ''}`}>
                <span className='text-bold'>ผลงาน</span>
            </li>
            <li onClick={()=>props.setStep(4)}
                className={`${props.step >= 4 ? 'active' : ''}`}>
                <span className='text-bold'>ส่งข้อมูล</span>
            </li>
        </ul>
    </div>
)

export default StepBar