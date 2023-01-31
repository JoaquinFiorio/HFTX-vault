import React from 'react'
import "./loading.css";
const Loading = () => {
  return (
    <div className="loading">
   
            <div className='spinner-border text-light'  style={{width: "60px", height: "60px"}} role='status'>
                <span className='sr-only'></span>
            </div>

    </div>
  )
}

export default Loading