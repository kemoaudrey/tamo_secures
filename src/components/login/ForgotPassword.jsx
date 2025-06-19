import React from 'react'
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import BASE_URL from '../config';

function ForgotPassword() {
    const [email, setEmail] = useState()
    const navigate = useNavigate()

    const handleForgotPassword = async () => {
        const response = await fetch(`${BASE_URL}/forgot-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
        navigate('/login')
        const data = await response.json();
        console.log(data);
      };

    return(
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h4>Forgot Password</h4>
        <form onSubmit={handleForgotPassword}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Send
          </button>
          </form>
        
      </div>
    </div>
    )
}

export default ForgotPassword;