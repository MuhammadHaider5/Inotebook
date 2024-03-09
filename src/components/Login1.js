import React from "react";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
const Login1 = (props) => {
    const [credentials, setCredentials] = useState({email: "", password:""})
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
          });
      
          if (!response.ok) {
            throw new Error('Failed to login');
          }
      
          const json = await response.json();
          console.log(json);
      
          if (json.success) {
            // save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged In  Successfully!","alert alert-info");
            navigate("/");
          } else {
            props.showAlert(json.message,"alert alert-danger");
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
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            aria-describedby="emailHelp"
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            onChange={onChange}
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login1;
