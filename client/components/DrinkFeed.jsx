import React from 'react';
import {useState,useEffect} from 'react'
// import '../styles.css';

const DrinkFeed = () => {
    const [drink,setDrink] = useState('');
    const [location, setLocation] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [ thoughts, setThoughts] = useState('');
    const [ recoveryThoughts, setRecoveryThoughts] = useState('');

    const handleAddDrinkButton = () => {
        const drinkInfo ={
            drink,
            location,
            ingredients,
            thoughts,
            recoveryThoughts
        };
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(drinkInfo)
        };

        // fetch info here - post drink to DB
    }






    return (
        <div style={{ border: 'solid', height: '100vh' }}>
            <div style={{textAlign:'right'}}>
                <label>Search Bar goes brrrrr</label>
                <input type='text' placeholder='Search here'></input>
            </div>
            <div style={{ border: 'solid', display: 'flex', height: '300px', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>

                    <label>Drink Name</label>
                    <input type='text' placeholder='Mango Margarita'></input>
                    <label>Location</label>
                    <input type='text' placeholder='Glorias Latin Cuisine'></input>
                    <label>Ingredients</label>
                    <input type='text' placeholder='Tequila!'></input>
                    <label>Thoughts</label>
                    <input type='text' placeholder='muy delicioso'></input>
                    <label>Recovery Thoughts</label>
                    <input type='text' placeholder='none'></input>
                </div>
                <div >
                    <button style={{height:'200px',width:'200px',marginTop:'20px',marginRight:'20px'}}>Add drink to database! But decorate me too!</button>
                </div>
            </div>
            <div style={{ border: 'solid' }}>
                <h3>this will be drink feed...maybe a drink component here?  </h3>
            </div>
        </div>
    )
}

export default DrinkFeed