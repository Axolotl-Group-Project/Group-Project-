import React, { useState, useEffect } from 'react';
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import '../scss/styles.scss';
import axios from 'axios';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //added state for confirm password input field
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const newUser = async (username, password) => {
    try {
      const response = await axios.post('/CreateUser', {
        username,
        password,
      });
      console.log('user registered successfully:', response.data)
    } catch (err) {
      console.log('Error registering user:', err);
    }
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // added logic for if passwords do not match
    if (password === confirmPassword) {
    await newUser(username, password);
    } else {
      console.log('else in handleSubmit');
      alert('Had too much to drink? Passwords do not match!');
    }
  };

  const handleLoginClick = () => {
    navigate('../Login')
  };

  return (
    <div>
        <h1 className='landing-page-title'>Let your Drink App journey begin!</h1>

        {/* <div className='sub-container'> */}

        <h2 className='description'>Log your deepest, darkest thoughts on drinks...</h2>
        <div className='form-container'>
          <form>
            <h3>Create Account</h3>
            <br />
            <label>Username:</label>
            <input 
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
            <br />
            <label>Password:</label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            <br />
            <label>Confirm Password:</label>
            <input 
              type='password'
              name='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              />
            <br />
            <button type='submit' onClick={handleSubmit}>Create Account</button>
            <br />
            <label>Already have an account?</label>
            <button onClick={handleLoginClick}>Login</button>
          </form>
        </div>
        </div>
    // </div>
  )
  }
  
export default CreateUser;