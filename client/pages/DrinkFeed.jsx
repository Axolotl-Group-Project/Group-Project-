import React from 'react';
import '../scss/styles.scss';
import { useState, useEffect } from 'react';
import { Link, Route, Routes, useNavigate } from "react-router-dom";


const DrinkFeed = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState('');
    const [drink, setDrink] = useState('');
    const [location, setLocation] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [thoughts, setThoughts] = useState('');
    const [recoveryThoughts, setRecoveryThoughts] = useState('');
    const [drinkList, setDrinkList] = useState([]);




    // upon first render of page, this should fetch drink list from DB and set state for drinkList
    useEffect(() => {
        fetch('http://localhost:9000/drinks')
            .then(response => {
                if (!response.ok) {
                    throw new Error(
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
    }, [])

    
    //func that will get relevant data from state, bundle it in body of POST req, and send to DB to make new drink document
    const handleAddDrinkButton = () => {
        
        const drinkInfo = {
            drink,
            location,
            flavors,
            rating,
            thoughts,
            recovery
        };
        //could add logic here to check that all drinkInfo fields have info, if not throw error 
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(drinkInfo) //may conflict w app.use(express.json()) in back end?
        };
        
        fetch('http://localhost:9000/addDrink', requestOptions) 
            .then(response => {
                if (!response.ok) {
                    throw new Error(
                        `HTTP error: res status -> ${response.status}`
                    );
                }
                //nested fetch req to get updated list of drinks and have drinkTable component re-render
                fetch('http://localhost:9000/drinks')
                    .then(data =>  data.json())
                    .then(data => setDrinkList(data.drinks))
                })
            .catch(error => {
                        console.log('error from with in fetch req of add drink');
                        console.error(error);
                    })
    }
    const deleteButtonHandler = (id) => {
        console.log('drink id ->', id);
        fetch(`http://localhost:9000/removeDrink/${id}`, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) {
                throw new Error(
                    `HTTP error: res status -> ${response.status}`
                );
            }
            //nested fetch req to get updated list of drinks and have drinkTable component re-render
            fetch('http://localhost:9000/drinks')
                .then(data =>  data.json())
                .then(data => setDrinkList(data.drinks))
            })
            
        // .then(fetch('http://localhost:9000/drinks'));
    }
    //update drink button handler:
    const updateButtonHandler = (id) => {
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
            //nested fetch req to get updated list of drinks and have drinkTable component re-render
            fetch('http://localhost:9000/drinks')
                .then(data =>  data.json())
                .then(data => setDrinkList(data.drinks))
            })
            
        // .then(fetch('http://localhost:9000/drinks'));)
    }
    //can change sampleList to drinkList once fetch reqs work, make sure to add _id into drink list/component
    const drinkTable = drinkList.map(({ drink, location, ingredients, thoughts, recoveryThoughts, _id }, idx) => { //destrcuture data from drink object
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
                <button onClick={() => deleteButtonHandler(_id)}>delete</button>
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
                    bottoms up!
                </button>

            </div>
            
            <div className='feed-table-title'>
                <h3>
                    What will you be having this evening?
                </h3>
                {drinkTable}
            </div>
            {/* <div>
                <SingleDrink drinks={drinkList} />
            </div> */}
        </div>
    )
}

export default DrinkFeed

//points to bring up ->
//what does search bar do? filter down the current list thats showing in drink feed?
//will edit button take us to another page or pop up a form to edit the drink? 
//figure out how to clear text/form fields after hitting add button 
//how to add pictures, need to edit DB model to include pic info/url for each pic? 

//made SingleDrink to play around w having drinkFeed be it's own component and passing info to it as props, not sure of pros and cons at this time, will keep everything on DrinkFeed page for now