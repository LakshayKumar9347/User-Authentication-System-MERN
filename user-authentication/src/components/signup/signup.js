import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })
    const handleChange = (event) => {
        // console.log(event.target.name)
        const { name, value } = event.target
        // console.log(name,value);
        setUser({
            ...user,
            [name]: value
        })
    }
    const handleSignUp = () => {
        if (user.firstName && user.lastName && user.email && user.password) {

            fetch('http://localhost:5500/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Request failed');
                    }
                })
                .then(data => {
                    // Handle the response data
                    console.log("this is promise first data ==>", data.message);
                    alert(data.message)
                })
                .catch(error => {
                    // Handle any errors that occurred during the request
                    console.error(error);
                });

            setUser({
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            })
        }
        else {
            alert("Invalid Credentials")
        }
    }
    return (
        <div className="container rounded" style={{ margin: "3rem auto", backgroundColor: "#6c5785", textAlign: "center", height: "70vh" }}>
            <h1>Sign Up </h1>
            <input className="m-1 rounded" name='firstName' value={user.firstName} onChange={handleChange} type="text" placeholder='Enter Your First Name' /><br />
            <input className="m-1 rounded" name='lastName' value={user.lastName} onChange={handleChange} type="text" placeholder='Enter Your Last Name' /><br />
            <input className="m-1 rounded" name='email' value={user.email} onChange={handleChange} type="text" placeholder='Enter Your Email' /><br />
            <input className="m-1 rounded" name='password' value={user.password} onChange={handleChange} type="text" placeholder='Enter Your Password' /><br />
            <button className="btn btn-primary m-1" onClick={handleSignUp}>SignUp</button>
            <div>or</div>
            <button className='btn btn-primary m-1' onClick={() => navigate('/login')} >Login</button>

        </div>
    )
}
