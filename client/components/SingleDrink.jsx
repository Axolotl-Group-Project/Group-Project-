import React from 'react';
import '../scss/styles.scss';

const SingleDrink = (props) => {
  console.log('props ->', props);
  // const drinkList =

  return (
    <div className='drink-container'>
      <ul>
        <li>Drink Name</li>
        <li>Location</li>
        <li>Ingredients</li>
        <li>Thoughts</li>
        <li>Recovery Thoughts</li>
      </ul>
      <div className='image-placeholder'>
        <p> Image here</p>
      </div>
    </div>
  )
}

export default SingleDrink;
//this component not needed after all 