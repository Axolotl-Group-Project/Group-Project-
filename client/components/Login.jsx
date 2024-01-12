import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
// import { Route } from 'react-router';
import {Link, Route, Routes, useNavigate} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted:', { username, email });
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
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
            </form>
        </div>
    )
}

export default Login;