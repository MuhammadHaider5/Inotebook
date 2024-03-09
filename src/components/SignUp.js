import React from 'react'
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
const SignUp = (props) => {
    const [credentials, setCredentials] = useState({name: "", email: "", password:"", Cpassword:""})
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credentials;
        try {
          const response = await fetch("http://localhost:5000/api/auth/createusers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password }),
          });
      
          if (!response.ok) {
            throw new Error('Failed to login');
          }
      
          const json = await response.json();
          console.log(json);
      
          if (json.success) {
            // save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Registered Successfully!", "success");
          } else {
            props.showAlert(json.message, "danger");
          }
        } catch (error) {
          console.error('Error logging in:', error.message);
          // Handle error (e.g., show error message to user)
        }
      };
      
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };
  return (
    <div>
      <form className="row g-3" onSubmit={handleSubmit}>
  <div className="col-md-12">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name"  placeholder="Your name" name='name' onChange={onChange} minLength={5} required/>    
  </div>
  <div className="col-md-12">
    <label htmlFor="email" className="form-label">Email</label>
    <input type="email" className="form-control" id="email" name='email' placeholder='Your email address' onChange={onChange} minLength={5} required/>
  </div>
  <div className="col-12">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" placeholder="#######" name='password' onChange={onChange} minLength={5} required/>
  </div>
  <div className="col-12">
    <label htmlFor="Cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="Cpassword" placeholder="#######" name='Cpassword' onChange={onChange} minLength={5} required/>
  </div>
  <div className="col-12">
    <button type="submit" className="btn btn-primary">Sign in</button>
  </div>
</form>
    </div>
  )
}

export default SignUp
