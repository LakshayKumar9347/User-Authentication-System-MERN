import React from 'react'
import './dashboard.css'

export default function Dashboard() {
  return (
    <div className='container dashboard m-5'style={{margin:"3rem auto",backgroundColor:"pink",textAlign:"center" ,height:"50vh"}}>
        <h1>Welcome To Dashboard</h1><br />
        <button className="btn btn-primary">Logout</button>
    </div>
  )
}
