import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import './scss/styles.scss';
import {Link, Route, Routes, useNavigate} from "react-router-dom";

//import all components here 
import Test from './components/Test.jsx';
import DrinkFeed from './pages/DrinkFeed.jsx';
import Login from './components/Login.jsx';
import CreateUser from './components/CreateUser.jsx';
import Update from './components/Update.jsx';

import user from './images/user.png';
import home from './images/envelope.png';
import edit from './images/edit.png';
import settings from './images/settings.png';
import help from './images/question.png';
import logout from './images/log-out.png';
import portrait from './images/pug.png';

const App = () => {
const navigate = useNavigate();
const [open, setOpen] = useState(false);
const dropdownRef = useRef(null);
const triggerRef = useRef(null);

useEffect(() => {
    function handleClickOutside(event) {
      if (open && dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          triggerRef.current && !triggerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
  
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

    const toggleDropdown = (e) => {
        e.stopPropagation();
        setOpen(!open);
    };


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
        {/* <nav className='nav-bar'>
            <button onClick={handleCreateUserClick}>Home</button>
            <button onClick={handleLoginClick}>Go to login</button>
            <button onClick={handleFeedClick}>To Main Feed</button>
        <button onClick={handleTestClick}>Take me to test! </button>
        <button>Dynamic Nav Button</button>
        </nav> */}
        <div className='menu-container'>
            <div className='menu-trigger' ref={triggerRef} onClick={toggleDropdown}>
                <img src={portrait} alt='Menu'></img>
        
       <Routes>
        
        <Route path='/' element={<CreateUser />} />
        <Route path='/test' element={<Test/>} />
        <Route path='/login' element={<Login/>} />
        {/* <Route path='/' element={<CreateUser/>} /> */}
        <Route path='/drinkFeed' element={<DrinkFeed/>} />
        <Route path='/update' element={<Update/>} />

        </Routes>
            </div>
            {open && (
            <div className='dropdown-menu' ref={dropdownRef}> 
                <h3 className='h3'>Drink<br/><span>Blissful Inebriation</span></h3>
                <ul>
                    <DropdownItem img = {home} text = "Home" path='/'/>
                    <DropdownItem img = {user} text = "My Profile" path='/drinkFeed'/>
                    <DropdownItem img = {edit} text = "Edit" path='/test'/>
                    <DropdownItem img = {settings} text = "Settings" path='/test'/>
                    <DropdownItem img = {help} text = "Help" path='/test'/>
                    <DropdownItem img = {logout} text = "Logout" path='/test'/>
                </ul>
            </div>
            )}
        </div>
       </div>
      </div>
    )
    

}

function DropdownItem(props) {
    const navigate = useNavigate();
    const handleItemClick = (e) => {
        e.stopPropagation();
        navigate(props.path);
    }
    return(
        <li className='dropdownItem' onClick={handleItemClick}>
            <img src={props.img} alt={props.text} />
            <a>{props.text}</a>
        </li>
    )
}

export default App