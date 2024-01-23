import React from 'react';
import '../scss/styles.scss';
import { useState, useEffect, Fragment } from 'react';
import { Link, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';


const Update = () => {
  
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
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

    fetch(`http://localhost:9000/updateDrink/${id}`, requestOptions)
    .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: res status -> ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        navigate('/drinkFeed'); // Navigate to drink feed after successful update
      })
      .catch((error) => {
        console.error('Failed to update the drink:', error);
      });
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
          <Dialog.Title>Update My Drink</Dialog.Title>
          <Dialog.Description>
            What changes would you like to make?
          </Dialog.Description>

          <div className='feed-page-container'>
            <div className='add-drink-container'>
              <form className='drink-form'>
                <label>Drink Name:</label>
                <input
                  type='text'
                  value={updatedDrink}
                  onChange={(e) => setUpdatedDrink(e.target.value)}
                ></input>

                <label>Location:</label>
                <input
                  type='text'
                  value={updatedLocation}
                  onChange={(e) => setUpdatedLocation(e.target.value)}
                ></input>

                <label>Ingredients:</label>
                <input
                  type='text'
                  value={updatedFlavors}
                  onChange={(e) => setUpdatedIngredients(e.target.value)}
                ></input>

                <label>Thoughts:</label>
                <input
                  type='text'
                  value={updatedThoughts}
                  onChange={(e) => setUpdatedThoughts(e.target.value)}
                ></input>

                <label>Recovery Thoughts:</label>
                <input
                  type='text'
                  value={updatedRecovery}
                  onChange={(e) => setUpdatedRecovery(e.target.value)}
                ></input>
              </form>

              <button
                className='add-drink-button'
                onClick={() => submitUpdatedButtonHandler(_id)}
              >
                Bottoms up-dated!
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
};

export default Update;
