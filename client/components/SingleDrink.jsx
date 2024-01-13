import React from 'react'

const SingleDrink = (props) => {
  console.log('props ->', props);
  // const drinkList =

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', border: 'solid' }}>
      <ul>
        <li>Drink Name</li>
        <li>Location</li>
        <li>Ingredients</li>
        <li>Thoughts</li>
        <li>Recovery Thoughts</li>
      </ul>
      <div style={{
        border: 'solid', height: '120px', width: '120px', marginRight: '50px', marginTop: '15px', backgroundColor: 'white'
      }}>
        <p> Image here</p>
      </div>
    </div>
  )
}

export default SingleDrink;
//this component not needed after all 