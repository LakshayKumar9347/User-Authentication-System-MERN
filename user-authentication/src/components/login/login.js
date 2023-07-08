import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login({setLoginUser}) {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const handleChange = (event) => {
    const { name, value } = event.target
    setUser({
      ...user,
      [name]: value
    })
  }
  const handleLogin = () => {
    if (user.email && user.password) {
      fetch('http://localhost:5500/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }).then((response)=>{
        if(response.ok){
          return response.json()
        }
        else{
          throw new Error("error")
        }
      }).then((data)=>{
        console.log("this is returning response data",data);
        setLoginUser({data})
      }).catch(err=>{
        console.log(err);
      })
    }
    else {
      alert("Invalid Details In Login Fields")
    }
  }
  return (
    <div className="container rounded" style={{ margin: "3rem auto", backgroundColor: "grey", textAlign: "center", height: "50vh" }}>
      <h1>login</h1>
      <input className="m-1 rounded" type="text" name='email' value={user.email} onChange={handleChange} placeholder='Enter Your Email' /><br />
      <input className="m-1 rounded" type="text" name='password' value={user.password} onChange={handleChange} placeholder='Enter Your Password' /><br />
      <button className='btn btn-primary m-1' onClick={handleLogin}>Login</button>
      <div>or</div>
      <button className="btn btn-primary m-1" onClick={() => navigate('/signup')}>SignUp</button>
    </div>
  )
}
