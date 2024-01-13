import React from 'react';

import { useState, useEffect } from 'react'
import SingleDrink from '../components/SingleDrink.jsx';

const DrinkFeed = () => {
    const [search,setSearch] = useState('');
    const [drink, setDrink] = useState('');
    const [location, setLocation] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [thoughts, setThoughts] = useState('');
    const [recoveryThoughts, setRecoveryThoughts] = useState('');

    const [drinkList,setDrinkList] = useState([])

    //upon first render of page, this should fetch drink list from DB and set state for drinkList
    // useEffect(()=>{
    //     fetch(/* DB URL that gets all drinks */)
    //         .then( response => {
    //             if(!response.ok){
    //                 throw new Error (
    //                     `HTTP error : status -> ${response.status}`
    //                 );
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             console.log('data with in useEffect f-req ->', data);
    //             // setDrinkList(data);
    //         })
    //         .catch(error => {
    //             console.log('error with in fetch req of useEffect @ DrinkFeed');
    //             console.error(error);
    //         })
    // },[])





    const handleAddDrinkButton = () => {
        const drinkInfo = {
            drink,
            location,
            ingredients,
            thoughts,
            recoveryThoughts
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(drinkInfo) //may conflict w app.use(express.json()) in back end?
        };

        fetch('http://localhost:9000/addDrink', requestOptions) //change DB URL as needed here
            .then(response =>{
                if (!response.ok){
                    throw new Error (
                        `HTTP error: res status -> ${response.status}`
                    );
                }
                //logic if you want to do something after posting new drink, navigate somewhere? pop up that confirms added drink?
            })
            .catch( error =>{
                console.log('error from with in fetch req of add drink');
                console.error(error);
            })
    };

    const drinkTable = drinkList.map(({drink,location,ingredients,thoughts,recoveryThoughts,_id}) =>{
            <ul>
                <li>{drink}</li>
                <li>{location}</li>
                <li>{ingredients}</li>
                <li>{thoughts}</li>
                <li>{recoveryThoughts}</li>
                <li>{_id}</li>
            </ul>
    });

    return (
        <div className='feed-page-container' >
            <div className='search-bar'>
                <label>Search Bar goes brrrrr</label>
                <input 
                type='text' 
                placeholder='Search here'
                onChange={(e) => setSearch(e.target.value)}
                ></input>
            </div>
            <div className='add-drink-container' >

                <form className='drink-form'>

                    <label>Drink Name</label>
                    <input
                        type='text'
                        placeholder='Mango Margarita'
                        onChange={(e) => setDrink(e.target.value)}
                    ></input>

                    <label>Location</label>
                    <input
                        type='text'
                        placeholder='Glorias Latin Cuisine'
                        onChange={(e) => setLocation(e.target.value)}
                    ></input>

                    <label>Ingredients</label>
                    <input
                        type='text'
                        placeholder='Tequila!'
                        onChange={(e) => setIngredients(e.target.value)}
                    ></input>

                    <label>Thoughts</label>
                    <input
                        type='text'
                        placeholder='muy delicioso'
                        onChange={(e) => setThoughts(e.target.value)}
                    ></input>

                    <label>Recovery Thoughts</label>
                    <input
                        type='text'
                        placeholder='none'
                        onChange={(e) => setRecoveryThoughts(e.target.value)}
                    ></input>

                </form>

                    <button className='add-drink-button' onClick={handleAddDrinkButton}>
                        Add drink to database! But decorate me too!
                    </button>
                
            </div>
            <div className='drink-feed'>
                <h2>This drink list comes from SingleDrink component</h2>
                <SingleDrink/>
                <SingleDrink/>
                <SingleDrink/>
            </div>
            <div style={{backgroundColor:'#40ebd7',height:'100vh'}}>
                <h3>
                    This list will come from drinkTable with in DrinkFeed component
                    <drinkTable/>
                </h3>
            </div>
        </div>
    )
}

export default DrinkFeed