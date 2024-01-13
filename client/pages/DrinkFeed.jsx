import React from 'react';
import { useState, useEffect } from 'react'


const DrinkFeed = () => {
    const [search,setSearch] = useState('');
    const [drink, setDrink] = useState('');
    const [location, setLocation] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [thoughts, setThoughts] = useState('');
    const [recoveryThoughts, setRecoveryThoughts] = useState('');

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
            body: JSON.stringify(drinkInfo)
        };

        // fetch info here - post drink to DB
    }

    console.log(recoveryThoughts);

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

                    <button className='add-drink-button'>
                        Add drink to database! But decorate me too!
                    </button>
                
            </div>
            <div className='drink-feed'>
                <h3>this will be drink feed...maybe a drink component here?  </h3>
            </div>
        </div>
    )
}

export default DrinkFeed