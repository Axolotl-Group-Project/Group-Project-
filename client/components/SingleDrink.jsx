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
      <button onClick={() => deleteButtonHandler(drink._id)}>delete</button>
      <button>edit</button>
      <div style={{border: 'solid', height: '120px', width: '120px', marginRight: '50px', marginTop: '15px', backgroundColor: 'white'}}
      >
          <p>Image here eventually</p>
      </div>
  </div>
    )
  })

  return (
    <>
    
      {allDrinks}
      <br></br>
      
    
    </>
    // <div style={{ display: 'flex', justifyContent: 'space-between', border: 'solid' }}>
    //   <ul>
    //     <li>Drink Name</li>
    //     <li>Location</li>
    //     <li>Ingredients</li>
    //     <li>Thoughts</li>
    //     <li>Recovery Thoughts</li>
    //   </ul>
    //   <div style={{
    //     border: 'solid', height: '120px', width: '120px', marginRight: '50px', marginTop: '15px', backgroundColor: 'white'
    //   }}>
    //     <p> Image here</p>
    //   </div>
    // </div>
  )
}

export default SingleDrink;
//this component not needed after all 