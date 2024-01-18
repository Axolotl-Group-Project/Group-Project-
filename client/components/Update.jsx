import React from 'react';
import '../scss/styles.scss';
import { useState, useEffect } from 'react';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useState } from 'react'
import { Dialog } from '@headlessui/react'


const Update = ({ state: {drink, location, flavors, rating, thoughts, recovery}}) => {
    const navigate = useNavigate();

    const [drink, setDrink] = useState('');
    const [location, setLocation] = useState('');
    const [rating, setRating] = useState('');
    const [flavors, setIngredients] = useState('');
    const [thoughts, setThoughts] = useState('');
    const [recovery, setRecoveryThoughts] = useState('');

    // upon first render of page, this should fetch drink info from drink feed fill in fields for the drink
  
    //submit updated drink button handler:
    const submitUpdatedButtonHandler = (id) => {
        console.log('drink id ->', id);
        const drinkInfo = {
            drink,
            location,
            flavors,
            rating,
            thoughts,
            recovery
        };
      
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(drinkInfo) 
        };
        fetch(`'http://localhost:9000/updateDrink/${id}`, { method: 'PUT' })
        .then(response => {
            if (!response.ok) {
                throw new Error(
                    `HTTP error: res status -> ${response.status}`
                );
            }
            //if successful, redirect to drink feed
            navigate('/drinkFeed')
            })
            
    }
   
    return (
        <div className='feed-page-container' >
            <div className='add-drink-container' >

                <form className='drink-form'>
                {/* //populate placeholders with drinkInfo */}
                    <label>Drink Name:</label>
                    <input
                        type='text'
                        placeholder= {drink}
                        onChange={(e) => setDrink(e.target.value)}
                    ></input>

                    <label>Location:</label>
                    <input
                        type='text'
                        placeholder= {location}
                        onChange={(e) => setLocation(e.target.value)}
                    ></input>

                    <label>Ingredients:</label>
                    <input
                        type='text'
                        placeholder= {flavors}
                        onChange={(e) => setIngredients(e.target.value)}
                    ></input>

                    <label>Thoughts:</label>
                    <input
                        type='text'
                        placeholder= {thoughts}
                        onChange={(e) => setThoughts(e.target.value)}
                    ></input>

                    <label>Recovery Thoughts:</label>
                    <input
                        type='text'
                        placeholder={recovery}
                        onChange={(e) => setRecoveryThoughts(e.target.value)}
                    ></input>

                </form>

                <button className='add-drink-button' onClick={handleAddDrinkButton}>
                    bottoms up-date-!
                </button>

            </div>
            
        </div>
    )
}

export default Update;

//will edit button take us to another page or pop up a form to edit the drink? 
