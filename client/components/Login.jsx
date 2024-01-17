import React, { useState, useEffect } from 'react';
import '../scss/styles.scss';
import { createRoot } from 'react-dom/client';
// import { Route } from 'react-router';
import {Link, Route, Routes, useNavigate} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        //Sarah rocks! 
        console.log('Submitted:', { username, password });
      };

    const handleCreateUser = () => {
        navigate('/')
    }

      return(
        <div className='login-form'>
            <h1>Login Page</h1>
            <form>
                <label>
                Username:
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <button type='submit' onClick={handleSubmit}>Login</button>
                <br />
                <h2>Don't have an account?</h2>
                <button className='create-one-button' onClick={handleCreateUser}>Create one!</button>
            </form>
        </div>
    )
}

export default Login;