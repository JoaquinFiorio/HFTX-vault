import React, { useState } from 'react'

const SetAdmins = () => {
    const [admin, setAdmin] = useState("")
  return (
    <div>
        <div>
            <input type="text" placeholder="Admin Address" value={admin} onChange={(e)=>setAdmin(e.target.value)}/>
        </div>
    </div>
  )
}

export default SetAdmins