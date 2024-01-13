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

    useEffect(()=>{
        fetch('http://localhost:9000/')
    })





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
                return response.json()
            })
            .then(data =>{
                console.log('data inside fetch req -->', data);
                setDrinkList(data);
                console.log('drinkList inside fetch req ->', drinkList);
            })
            .catch( error =>{
                console.log('error from with in fetch req of add drink');
                console.error(error);
            })
    }
    


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
        </div>
    )
}

export default DrinkFeed