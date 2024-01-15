import React from 'react';
import '../scss/styles.scss';
import { useState, useEffect } from 'react'
// import SingleDrink from '../components/SingleDrink.jsx';

const DrinkFeed = () => {
    const [search, setSearch] = useState('');
    const [drink, setDrink] = useState('');
    const [location, setLocation] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [thoughts, setThoughts] = useState('');
    const [recoveryThoughts, setRecoveryThoughts] = useState('');

    const [drinkList, setDrinkList] = useState([])

    //for testig purposes while backend is still being set up, this is current drinkList 
    const [sampleList, setSampleList] = useState([{
        drink: 'beer',
        location: 'here',
        ingredients: 'brown stuff',
        thoughts: 'it was good',
        recoveryThoughts: 'not too long'
    }, {
        drink: 'wine',
        location: 'there',
        ingredients: 'red stuff',
        thoughts: 'it was splendid ',
        recoveryThoughts: 'not too long'
    }, {
        drink: 'water',
        location: 'everywhere',
        ingredients: 'clearstuff',
        thoughts: 'the best',
        recoveryThoughts: 'none'
    }]);

    // upon first render of page, this should fetch drink list from DB and set state for drinkList
    useEffect(()=>{
        fetch('http://localhost:9000/drinks')
            .then( response => {
                if(!response.ok){
                    throw new Error (
                        `HTTP error : status -> ${response.status}`
                    );
                }
                return response.json();
            })
            .then(data => {
                // console.log('data with in useEffect f-req ->', data);
                setDrinkList(data.drinks);
                // console.log(drinkList);
            })
            .catch(error => {
                console.log('error with in fetch req of useEffect @ DrinkFeed');
                console.error(error);
            })
    },[])


    //func that will get relevant data from state, bundle it in body of POST req, and send to DB to make new drink document
    const handleAddDrinkButton = () => {
        const drinkInfo = {
            drink,
            location,
            ingredients,
            thoughts,
            recoveryThoughts
        };
        //could add logic here to check that all drinkInfo fields have info, if not throw error 
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(drinkInfo) //may conflict w app.use(express.json()) in back end?
        };

        fetch('http://localhost:9000/addDrink', requestOptions) //change DB URL as needed here
            .then(response => {
                if (!response.ok) {
                    throw new Error(
                        `HTTP error: res status -> ${response.status}`
                    );
                }
                //logic if you want to do something after posting new drink, navigate somewhere? pop up that confirms added drink?
                // Navigate('./DrinkFeed.jsx')
            })
            .catch(error => {
                console.log('error from with in fetch req of add drink');
                console.error(error);
            })
    };

    //can change sampleList to drinkList once fetch reqs work, make sure to add _id into drink list/component
    const testTable = drinkList.map(({ drink, location, ingredients, thoughts,recoveryThoughts },idx) => { //destrcuture data from drink object
        return (
            //change idx to relevant_id given by DB 
            <div key={idx} className='drink-item'>
                <ul >
                    <li>Drink: {drink}</li>
                    <li>Location: {location}</li>
                    <li>Ingredients: {ingredients}</li>
                    <li>Thoughts: {thoughts}</li>
                    <li>Recovery Thoughts: {recoveryThoughts}</li>
                </ul>
                <button className='delete-button'>delete</button>
                <button>edit</button>
                <div className='image-container'
                >
                    <p>Image here eventually</p>
                </div>
            </div>
        );
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

                    <label>Drink Name:</label>
                    <input
                        type='text'
                        placeholder='Mango Margarita'
                        onChange={(e) => setDrink(e.target.value)}
                    ></input>

                    <label>Location:</label>
                    <input
                        type='text'
                        placeholder='Glorias Latin Cuisine'
                        onChange={(e) => setLocation(e.target.value)}
                    ></input>

                    <label>Ingredients:</label>
                    <input
                        type='text'
                        placeholder='Tequila!'
                        onChange={(e) => setIngredients(e.target.value)}
                    ></input>

                    <label>Thoughts:</label>
                    <input
                        type='text'
                        placeholder='Muy Delicioso'
                        onChange={(e) => setThoughts(e.target.value)}
                    ></input>

                    <label>Recovery Thoughts:</label>
                    <input
                        type='text'
                        placeholder='No Hangover!'
                        onChange={(e) => setRecoveryThoughts(e.target.value)}
                    ></input>

                </form>

                <button className='add-drink-button' onClick={handleAddDrinkButton}>
                    Add drink to database! But decorate me too!
                </button>

            </div>
            
            <div className='feed-table-title'>
                <h3>
                    What will you be having this evening?
                </h3>
                {testTable}
            </div>
        </div>
    )
}

export default DrinkFeed