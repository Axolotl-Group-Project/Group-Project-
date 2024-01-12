import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
// import { Route } from 'react-router';
import {Link, Route, Routes, useNavigate} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted:', { username, password });
      };

    return(
        <div>
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
            </form>
        </div>
    )
}

export default Login;