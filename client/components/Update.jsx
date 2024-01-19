import React from 'react';
import '../scss/styles.scss';
import { useState, useEffect, Fragment } from 'react';
import { Link, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';


const Update = () => {
  
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const { drink, location: drinkLocation, flavors, rating, thoughts, recovery, _id } = location.state || {};

  
  const [updatedDrink, setUpdatedDrink] = useState(drink || '');
  const [updatedLocation, setUpdatedLocation] = useState(drinkLocation || '');
  const [updatedRating, setUpdatedRating] = useState(rating || '');
  const [updatedFlavors, setUpdatedIngredients] = useState(flavors || '');
  const [updatedThoughts, setUpdatedThoughts] = useState(thoughts || '');
  const [updatedRecovery, setUpdatedRecovery] = useState(recovery || '');
 

  // upon first render of page, this should fetch drink info from drink feed fill in fields for the drink

  //submit updated drink button handler:
  const submitUpdatedButtonHandler = (id) => {
    console.log('drink id ->', id);
    const drinkInfo = {
      drink: updatedDrink,
      location: updatedLocation,
      flavors: updatedFlavors,
      rating: updatedRating,
      thoughts: updatedThoughts,
      recovery: updatedRecovery,
    };

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(drinkInfo),
    };

    fetch(`'http://localhost:9000/updateDrink/${id}`, { method: 'PUT' }).then(
      (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: res status -> ${response.status}`);
        }
        //if successful, redirect to drink feed
        // navigate('/drinkFeed')
        setIsOpen(false);
      }
    );
  };

  return (
    <Transition
      show={isOpen}
      enter='transition duration-100 ease-out'
      enterFrom='transform scale-95 opacity-0'
      enterTo='transform scale-100 opacity-100'
      leave='transition duration-75 ease-out'
      leaveFrom='transform scale-100 opacity-100'
      leaveTo='transform scale-95 opacity-0'
      as={Fragment}
    >
      <Dialog onClose={() => setIsOpen(false)}>
        <Dialog.Panel>
          <Dialog.Title>update my drink</Dialog.Title>
          <Dialog.Description>
            update the information about my drink
          </Dialog.Description>

          <div className='feed-page-container'>
            <div className='add-drink-container'>
              <form className='drink-form'>
                {/* //populate placeholders with drinkInfo */}
                <label>Drink Name:</label>
                <input
                  type='text'
                  value={drink}
                  onChange={(e) => setUpdatedDrink(e.target.value)}
                ></input>

                <label>Location:</label>
                <input
                  type='text'
                  value={location}
                  onChange={(e) => setUpdatedLocation(e.target.value)}
                ></input>

                <label>Ingredients:</label>
                <input
                  type='text'
                  value={flavors}
                  onChange={(e) => setUpdatedIngredients(e.target.value)}
                ></input>

                <label>Thoughts:</label>
                <input
                  type='text'
                  value={thoughts}
                  onChange={(e) => setUpdatedThoughts(e.target.value)}
                ></input>

                <label>Recovery Thoughts:</label>
                <input
                  type='text'
                  value={recovery}
                  onChange={(e) => setUpdatedRecovery(e.target.value)}
                ></input>
              </form>

              <button
                className='add-drink-button'
                onClick={submitUpdatedButtonHandler}
              >
                bottoms up-date-!
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
};

export default Update;
