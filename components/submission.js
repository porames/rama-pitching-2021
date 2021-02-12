import React from 'react'

const Submission = (props) => {
    return(
       <div>
           <h3 className='text-center mb-4'>ยืนยันการสมัคร</h3>
           <div className='alert alert-dark'>
               {JSON.stringify(props.values)}
           </div>
       </div> 
    )
}
export default Submission