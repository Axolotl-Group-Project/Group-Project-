import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
// import { Route } from 'react-router';
import {Link, Route, Routes, useNavigate} from "react-router-dom";

//import all components here 
import Test from './components/Test.jsx';

const App = () => {
const navigate = useNavigate();




    const handleTestClick = ()  =>{
        navigate('./test');
    }



    return(
        <>
        <nav></nav>
        <h1>this is from App component </h1>
        {/* <button onClick={handleTestClick}>Take me to test! </button> */}


       <Routes>
        {/* <Route path='/' element={<Login/>} /> */}
        <Route path='/test' element={<Test/>} />
        {/* <Route path='/login' element={<Login/>} />
        <Route path='/createUser' element={<CreateUser/>} />
        <Route path='/drinkFeed' element={<DrinkFeed/>} /> */}

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