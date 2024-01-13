import React, { useState, useEffect } from 'react';
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import axios from 'axios';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const newUser = async (username, password) => {
    try {
      const response = await axios.post('/createUser', {
        username,
        password,
      });
      console.log('user registered successfully:', response.data)
    } catch (err) {
      console.err('Error registering user:', err);
    }
  };

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await newUser(username, password);
  };

  const handleLoginClick = () => {
    navigate('../Login')
  }

  return (
    <div>
        <h1>Let your Drink App journey begin!</h1>

        <div style={{display:'flex',border:'solid', justifyContent:'space-around'}}>

        <div style={{border:'solid',height:'200px'}}>Let Drink App help you remember your best drinks!</div>
        <div style={{border:'solid'}}>
          <form>
            <label>Create Account</label>
            <br />
            <label>Username</label>
            <input 
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
            <br />
            <label>Password</label>
            <input
              type='text'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            <br />
            <label>Confirm Password</label>
            <input 
              type='text'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            <br />
            <button type='submit' onClick={handleSubmit}>Create Account</button>
            <br />
            <label>Already have an account?</label>
            <button onClick={handleLoginClick}>Login</button>
          </form>
        </div>
        </div>
    </div>
  )
}

export default CreateUser;