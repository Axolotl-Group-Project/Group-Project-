// *** ORIGINAL CODE *** //

// import React from 'react';
// import '../scss/styles.scss';
// import { useState, useEffect } from 'react';
// import { Link, Route, Routes, useNavigate } from "react-router-dom";
// import Update from '../components/Update.jsx';
// import { Dialog } from '@headlessui/react';

// const DrinkFeed = () => {
//     const navigate = useNavigate();
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [drinkList, setDrinkList] = useState([]); // hold the list of drinks
//     const [selectedDrink, setSelectedDrink] = useState(null); // hold the currently selected drink for the details modal
//     const [search, setSearch] = useState('');
//     const [drink, setDrink] = useState('');
//     const [location, setLocation] = useState('');
//     const [rating, setRating] = useState('');
//     const [flavors, setIngredients] = useState('');
//     const [thoughts, setThoughts] = useState('');
//     const [recovery, setRecoveryThoughts] = useState('');

//     const drinkInfo = {
//         drink,
//         location,
//         flavors,
//         rating,
//         thoughts,
//         recovery,
//     };

//     // Function to open the modal with selected drink details
//     const openModal = (drink) => {
//         setSelectedDrink(drink);
//         setIsModalOpen(true);
//     };

//     // upon first render of page, this should fetch drink list from DB and set state for drinkList
//     useEffect(() => {
//         fetch('http://localhost:9000/drinks')
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error(
//                         `HTTP error : status -> ${response.status}`
//                     );
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 // console.log('data with in useEffect f-req ->', data);
//                 setDrinkList(data.drinks);
//                 // console.log(drinkList);
//             })
//             .catch(error => {
//                 console.error('Error fetching drinks:', error);
//             })
//     }, [])

//     const renderVirtualDrinks = () => {
//         return drinkList.map((drink) => (
//           <div key={drink._id} className="virtual-drink" onClick={() => openDetailsModal(drink)}>
//             {drink.name} {/* Or however you want to display the name of the drink */}
//           </div>
//         ));
//     };
    
//     // Render the details modal
//   const renderDrinkDetailsModal = () => {
//     if (!selectedDrink) return null;


//  // Function to close the modal
//  const closeDetailsModal = () => {
//     setIsModalOpen(false);
//     setSelectedDrink(null);
// };

//     return (
        
//       <Dialog open={Boolean(selectedDrink)} onClose={closeDetailsModal} className="details-modal">
//         <Dialog.Overlay className="overlay" />
        
//         <Dialog.Panel className="panel">
//           <Dialog.Title>{selectedDrink.name}</Dialog.Title>
//           {/* Display the details of the selected drink */}
//           {/* You will render the details here */}
//           <p>Rating: {selectedDrink.rating}</p>
//           <p>Ingredients: {selectedDrink.flavors}</p>
//           <p>Thoughts: {selectedDrink.thoughts}</p>
//           <p>Recovery Thoughts: {selectedDrink.recovery}</p>
//           <button onClick={closeDetailsModal}>Close</button>
//         </Dialog.Panel>
//       </Dialog>
//     );
//   };


//     //func that will get relevant data from state, bundle it in body of POST req, and send to DB to make new drink document
//     const handleAddDrinkButton = () => {
//         //could add logic here to check that all drinkInfo fields have info, if not throw error 
//         const requestOptions = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(drinkInfo) //may conflict w app.use(express.json()) in back end?
//         };
        
//         fetch('http://localhost:9000/addDrink', requestOptions) 
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error(
//                         `HTTP error: res status -> ${response.status}`
//                     );
//                 }
//                 //nested fetch req to get updated list of drinks and have drinkTable component re-render
//                 fetch('http://localhost:9000/drinks')
//                     .then(data =>  data.json())
//                     .then(data => setDrinkList(data.drinks))
//                 })
//             .catch(error => {
//                         console.log('error from with in fetch req of add drink');
//                         console.error(error);
//                     })
//     }
//     const deleteButtonHandler = (id) => {
//         console.log('drink id ->', id);
//         fetch(`http://localhost:9000/removeDrink/${id}`, { method: 'DELETE' })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(
//                     `HTTP error: res status -> ${response.status}`
//                 );
//             }
//             //nested fetch req to get updated list of drinks and have drinkTable component re-render
//             fetch('http://localhost:9000/drinks')
//                 .then(data =>  data.json())
//                 .then(data => setDrinkList(data.drinks))
//             })
            
//         // .then(fetch('http://localhost:9000/drinks'));
//     }
    
//     // button handler to update drink, passing in state of drink (ref: https://reactrouter.com/en/main/hooks/use-navigate):
//     const handleUpdateClick = (drinkInfo) =>{
//         navigate('/update', { state: { ...drinkInfo } });
//     }
   
//     //can change sampleList to drinkList once fetch reqs work, make sure to add _id into drink list/component
//     const drinkTable = drinkList.map(({ drink, location, rating, flavors, thoughts, recovery, _id }, idx) => { //destrcuture data from drink object
//         return (
//             //change idx to relevant_id given by DB 
//             <div key={idx} className='drink-item'>
//                 <ul >
//                     <li>Drink: {drink}</li>
//                     <li>Location: {location}</li>
//                     <li>Rating: {rating}</li>
//                     <li>Ingredients: {flavors}</li>
//                     <li>Thoughts: {thoughts}</li>
//                     <li>Recovery Thoughts: {recovery}</li>
//                 </ul>
//                 <button onClick={() => deleteButtonHandler(_id)}>Delete</button>
//                 <button onClick={() => handleUpdateClick({ drink, location, rating, flavors, thoughts, recovery, _id })}>Edit</button>
//                 <div className='image-container'
//                 >
//                     <p>Image here eventually</p>
//                 </div>
//             </div>
//         );
//     });

//     return (
//         <div className='drink-feed-container'>
//         <div className='feed-page-container'>
//           <div className='search-bar'>
//             <label>Search Bar goes brrrrr</label>
//             <input
//               type='text'
//               placeholder='Search here'
//               onChange={(e) => setSearch(e.target.value)}
//             ></input>
//           </div>
      
//           <div className='add-drink-container'>
//             <form className='drink-form'>
//               <label>Drink Name:</label>
//               <input
//                 type='text'
//                 placeholder='Mango Margarita'
//                 onChange={(e) => setDrink(e.target.value)}
//               ></input>
      
//               <label>Location:</label>
//               <input
//                 type='text'
//                 placeholder='Glorias Latin Cuisine'
//                 onChange={(e) => setLocation(e.target.value)}
//               ></input>
      
//               <label>Ingredients:</label>
//               <input
//                 type='text'
//                 placeholder='Tequila!'
//                 onChange={(e) => setIngredients(e.target.value)}
//               ></input>
      
//               <label>Thoughts:</label>
//               <input
//                 type='text'
//                 placeholder='Muy Delicioso'
//                 onChange={(e) => setThoughts(e.target.value)}
//               ></input>
      
//               <label>Recovery Thoughts:</label>
//               <input
//                 type='text'
//                 placeholder='No Hangover!'
//                 onChange={(e) => setRecoveryThoughts(e.target.value)}
//               ></input>
//             </form>
      
//             <button className='add-drink-button' onClick={handleAddDrinkButton}>
//               Bottoms up!
//             </button>
//           </div>
      
//           <div className='feed-table-title'>
//             <h3>What will you be having this evening?</h3>
//             {drinkTable}
//           </div>
      
//           {/* Map over the drinks and render them */}
//           {drinkList.map((drink) => (
//             <div key={drink._id} className='drink-item'>
//               {/* ... drink info */}
//               <button onClick={() => openModal(drink)}>Details</button>
//             </div>
//           ))}
//         <div className="virtual-drink-bar">
//         {renderVirtualDrinks()}
//         </div>
//           {/* Render the Drink Details Modal */}
//           {renderDrinkDetailsModal()}
//         </div>
//         </div>

        
//       );
// };

// export default DrinkFeed

// *** END OF ORIGINAL CODE *** //

// *** start of whack bar shelf *** //

import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Dialog } from '@headlessui/react';
import '../scss/styles.scss';

const DrinkFeed = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDrink, setSelectedDrink] = useState(null);
    const [drinkList, setDrinkList] = useState([]);
    const [search, setSearch] = useState('');
    const [drink, setDrink] = useState('');
    const [location, setLocation] = useState('');
    const [rating, setRating] = useState('');
    const [flavors, setIngredients] = useState('');
    const [thoughts, setThoughts] = useState('');
    const [recovery, setRecoveryThoughts] = useState('');

    const drinkInfo = {
        drink,
        location,
        flavors,
        rating,
        thoughts,
        recovery,
    };

  useEffect(() => {
    fetch('http://localhost:9000/drinks')
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error: status -> ${response.status}`);
        return response.json();
      })
      .then(data => setDrinkList(data.drinks))
      .catch(error => console.error('Error fetching drinks:', error));
  }, []);

  const openModal = (drink) => {
    setSelectedDrink(drink);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDrink(null);
  };

  const handleAddDrinkButton = () => {
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
const deleteButtonHandler = (_id) => {
            console.log('drink id ->', _id);
            fetch(`http://localhost:9000/removeDrink/${_id}`, { method: 'DELETE' })
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
        
        // button handler to update drink, passing in state of drink (ref: https://reactrouter.com/en/main/hooks/use-navigate):
        const handleUpdateClick = (drinkInfo) =>{
            navigate('/update', { state: { ...drinkInfo } });
        }

        const drinkTable = drinkList.map(({ drink, location, rating, flavors, thoughts, recovery, _id }, idx) => { //destrcuture data from drink object
                    return (
                        //change idx to relevant_id given by DB 
                        <div key={idx} className='drink-item'>
                            <ul >
                                <li>Drink: {drink}</li>
                                <li>Location: {location}</li>
                                <li>Rating: {rating}</li>
                                <li>Ingredients: {flavors}</li>
                                <li>Thoughts: {thoughts}</li>
                                <li>Recovery Thoughts: {recovery}</li>
                            </ul>
                            <button onClick={() => deleteButtonHandler(_id)}>Delete</button>
                            <button onClick={() => handleUpdateClick({ drink, location, rating, flavors, thoughts, recovery, _id })}>Edit</button>
                            <div className='image-container'
                            >
                                <p>Image here eventually</p>
                            </div>
                        </div>
                    );
                });
            

                const renderVirtualDrinks = () => {
                    return drinkList.map((drink) => (
                      <div key={drink._id} className="virtual-drink" onClick={() => openModal(drink)}>
                        {drink.drink}
                        <button onClick={() => deleteButtonHandler(drink._id)}>Delete</button>
                        <button onClick={() => handleUpdateClick(drink)}>Edit</button>
                      </div>
                    ));
                  };

  const renderDrinkDetailsModal = () => {
    if (!selectedDrink) return null;
    
    return (
      <Dialog open={isModalOpen} onClose={closeModal} className="details-modal">
        <Dialog.Overlay className="overlay" />
        <Dialog.Panel className="panel">
          <Dialog.Title>{selectedDrink.name}</Dialog.Title>
          <p>Rating: {selectedDrink.rating}</p>
          <p>Ingredients: {selectedDrink.flavors}</p>
          <p>Thoughts: {selectedDrink.thoughts}</p>
          <p>Recovery Thoughts: {selectedDrink.recovery}</p>
          <button onClick={closeModal}>Close</button>
        </Dialog.Panel>
      </Dialog>
    );
  };

  return (
    <div className='drink-feed-container'>
      <div className='search-bar'>
        <label>Search Bar goes brrrrr</label>
        <input
          type='text'
          placeholder='Search here'
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
  
      <div className='add-drink-container'>
        <form className='drink-form'>
          <label>Drink Name:</label>
          <input
            type='text'
            placeholder='Mango Margarita'
            onChange={(e) => setDrink(e.target.value)}
          />
  
          <label>Location:</label>
          <input
            type='text'
            placeholder='Glorias Latin Cuisine'
            onChange={(e) => setLocation(e.target.value)}
          />
  
          <label>Ingredients:</label>
          <input
            type='text'
            placeholder='Tequila!'
            onChange={(e) => setIngredients(e.target.value)}
          />
  
          <label>Thoughts:</label>
          <input
            type='text'
            placeholder='Muy Delicioso'
            onChange={(e) => setThoughts(e.target.value)}
          />
  
          <label>Recovery Thoughts:</label>
          <input
            type='text'
            placeholder='No Hangover!'
            onChange={(e) => setRecoveryThoughts(e.target.value)}
          />
        </form>
        <button className='add-drink-button' onClick={handleAddDrinkButton}>Bottoms up!</button>
          <div className='feed-table-title'>
             <h3>What will you be having this evening?</h3>
             {/* {drinkTable} not using this in 2nd set */} 
           </div>
      
           {/*Map over the drinks and render them --- not using 435 to 440 in second set */}
           {/* {drinkList.map((drink) => (
            <div key={drink._id} className='drink-item'>
              ... drink info
              <button onClick={() => openModal(drink)}>Details</button>
            </div>
          ))} */}
      </div>
  
      <div className="virtual-drink-bar">
        {renderVirtualDrinks()}
      </div>
  
      {renderDrinkDetailsModal()}
    </div>
  );  
}

export default DrinkFeed;