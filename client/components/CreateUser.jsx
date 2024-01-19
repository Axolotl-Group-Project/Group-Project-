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
// passing in an object below into newUser vvv
  const newUser = async (username, password1) => {
    // console.log('console.log',{"userName":username.username})
    try {
      //Updated the path to /signup
      console.log('console.log in CreateUser',{'userName':username,'password':password1})
      const response = await axios.post('http://localhost:9000/signup', {
        // was playing around with userName':username.username, but the userName is always undefined
        'userName':username,
        'password':password1
      });
      console.log('user registered successfully:', response.data)
    } catch (err) {
      console.log('Error registering user:', err);
    }
  };

  // to add:
  
  // once we create new user, redirect logged in to the drink feed
  // don't need to verify user that was just created. They will already have a session

  // refer to each user by sessionId?
  

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
    navigate('/Login')
  };

  return (
    <div>
        <h1 className='landing-page-title'>Let your Drink App journey begin!</h1>

        {/* <div className='sub-container'> */}

        <h2 className='description'>Log your deepest, darkest thoughts on drinks...</h2>
        <div className='form-container'>
          {/* added onSubmit={handleSubmit} to the form logic below*/}
          <form onSubmit={handleSubmit}>
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
            <button type='submit'>Create Account</button>
            <br />
            <label>Already have an account?</label>
            <button onClick={handleLoginClick}>Login</button>
          </form>
        </div>
        </div>
    // </div>
  )
  };

export default CreateUser;