import React, { useState } from 'react';
import '../scss/styles.scss';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('Submitted:', { username, password });
            console.log('session is still being worked on')
// Add login logic to add session here as well
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