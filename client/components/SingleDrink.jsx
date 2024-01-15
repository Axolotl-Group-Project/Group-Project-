import React from 'react'
const SingleDrink = (props) => {
  
  const deleteButtonHandler = (id) => {
    fetch(`http://localhost:9000/removeDrink/${id}`,{method: 'DELETE'})
        //deletes but requires manual refresh, figure out how to delete from component w state passed down from parent componenet 
}
  const allDrinks = props.drinks.map( ({drink,location},idx) => {
    return (
      //change idx to relevant_id given by DB 
      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', border: 'solid' }}>
      <ul >
          <li>Drink: {drink}</li>
          <li>Location: {location}</li>
      </ul>
      <div className='image-placeholder'>
        <p> Image here</p>
      <button onClick={() => deleteButtonHandler(drink._id)}>delete</button>
      <button>edit</button>
      <div >
          <p>Image here eventually</p>
      </div>
    </div>
  )
})

export default SingleDrink;
//this component not needed after all 