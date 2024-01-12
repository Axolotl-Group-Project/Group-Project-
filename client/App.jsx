import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
// import { Route } from 'react-router';
import {Link, Route, Routes, useNavigate} from "react-router-dom";

//import all components here 
import Test from './components/Test.jsx';

import DrinkFeed from './components/DrinkFeed.jsx';

import Login from './components/Login.jsx';

const App = () => {
const navigate = useNavigate();

    const handleTestClick = ()  =>{
        navigate('./test');
    }
    const handleFeedClick = () => {
        navigate('./drinkFeed');
    }
    return(
        <>
        <nav style={{display:'flex',justifyContent:'space-evenly',height:'50px',border:'solid'}}>
            <button onClick={handleFeedClick}>To Main Feed</button>
            <button>NavLink 2</button>
            <button>NavLink 3</button>
        <button onClick={handleTestClick}>Take me to test! </button>
        <p>This navbar/header should appear on every page </p>
        </nav>
        
       <Routes>

        {<Route path='/' element={<Login/>} />}

   
        <Route path='/test' element={<Test/>} />
        {/* <Route path='/login' element={<Login/>} /> */}
        {/* <Route path='/createUser' element={<CreateUser/>} /> */}
        <Route path='/drinkFeed' element={<DrinkFeed/>} />

        </Routes>
        </>
    )
    //landing page:

    //main page:

}


// const App = () =>{
//     return(
//         <>
//         <nav style={{textAlign:'center'}}>
//             <ul style={{listStylePosition:'inside', listStyleType:'none', backgroundColor:'rgb(230, 230, 238, .5)', margin:'0px'}}>
//                 <li>Super Cool NavBar</li>
//                 <li><Link to='/'>Home</Link></li>
//                 <li><Link to='/hikes/create'>Create a new Hike here!</Link></li>
//             </ul>
//         </nav>


//         <Routes>
//             <Route path="/" element={<Home />}/>
//             <Route path="/hikes/create" element={<CreateHike/>}></Route>
//             <Route path="/hikes/details/:id" element={<ShowHike/>}></Route>
//             <Route path="/hikes/edit/:id" element={<UpdateHike/>}></Route>
//             <Route path="/hikes/delete/:id" element={<DeleteHike/>}></Route>
//             <Route path="*" element={<NotFound/>}></Route>
//             <Route path='/hikes/imageloader/:id' element ={<ImageLoader/>}></Route>
//             {/* <Route path="/hikes" element={<Hikelist/>}/> */}
            
//         </Routes>    
//         </>
//     )
// };

export default App