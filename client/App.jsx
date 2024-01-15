import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './scss/styles.scss';
import {Link, Route, Routes, useNavigate} from "react-router-dom";

//import all components here 
import Test from './components/Test.jsx';
import DrinkFeed from './pages/DrinkFeed.jsx';
import Login from './components/Login.jsx';
import CreateUser from './components/CreateUser.jsx';

const App = () => {
const navigate = useNavigate();

    const handleTestClick = ()  =>{
        navigate('./test');
    }
    const handleFeedClick = () => {
        navigate('./drinkFeed');
    }

    const handleLoginClick = () =>{
        navigate('./login');
    }

    const handleCreateUserClick = () =>{
        navigate('/');
    }
    return(
        <div className='container-content'>
        <div className='container'>
        <nav className='nav-bar'>
            <button onClick={handleCreateUserClick}>Home</button>
            <button onClick={handleLoginClick}>Go to login</button>
            <button onClick={handleFeedClick}>To Main Feed</button>
        <button onClick={handleTestClick}>Take me to test! </button>
        <button>Dynamic Nav Button</button>
        </nav>
        
       <Routes>
        
        <Route path='/' element={<CreateUser />} />
        <Route path='/test' element={<Test/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<CreateUser/>} />
        <Route path='/drinkFeed' element={<DrinkFeed/>} />

        </Routes>
        </div>
        </div>
    )
    

}

export default App