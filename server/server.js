// allows us to use 'mongoose' functionality
const mongoose = require('mongoose');

const app = express();
// import for environmental variables - .config => when you type it autofills
require('dotenv').config();

const URI = `mongodb+srv://${db_userName}:${db_password}@axolotl.xogzh1q.mongodb.net/?retryWrites=true&w=majority`;

// route for creating new user:


// logic that will display in terminal if mongoose connection to atlas is successful
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected to Atlas!')
});

// logic that will display in terminal if mongoose to atlas encounters an error
mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error: ', err)
});


// logic that will display in terminal if mongoose to atlas is disconnected
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected.')
});const express = require('express');











// take in json obj and observe static files

// routes for landing page -- localhost?

const userController = require('./controllers/userController');
// route for creating new user:
app.post('/signup', userController.createUser, (req, res)  => {
    console.log('new user created')
    res.status(201).json(res.locals.userID);
});

// login and sign up logic
app.post('/login', userController.verifyUser, (req, res) => {
    if(res.locals.verifiedUser) {
    console.log('found user in db')
    res.status(201).json(res.locals.userID)
    }
    else res.status(401).json(userID);
});

// account creation logic *

// logic to test mongoose connection (connected to database) *
  //error handling

// functionality to start the server

  // middleware for validating drinks
drinkDataValidation = (req, res, next) => {
// confirm required data
const {drink, location} = req.body;
// error status if incorrect
  if(!drink || !location){
    return res.status(400).json({ success: false, message: 'Required Drink Data Not Entered' });
  }

  next();
}
// route for adding a drink 
app.post('/addDrink', drinkDataValidation, (req, res) => {

  const newDrink = new drinkSchema(req.body);

  newDrink.save()
  .then(()=>{
  // confirmation it works
  res.status(201).json({ success: true, message: 'Drink was added to the database' });
  })
  .catch((error) => {
    console.error('Error adding drink:', error);
    res.status(500).json({ success: false, message: 'Unable to add drink to the database' });
  });
});

// route for deleting a drink
app.delete('/removeDrink/:id', (req, res) => {
  // extract the drink id
  const drinkId = req.params.id;

  // Use Mongoose to find the drink by ID and remove it
  drinkSchema.findByIdAndDelete(drinkId)
    .then((removedDrink) => {
      if (removedDrink) {
        res.status(204).json({ success: true, message: `Sucessfully removed ${removedDrink} from the database`});
      } else {
        res.status(404).json({ success: false, message: `Drink with ID ${drinkId} was not found in the database` });
      }
    })
    .catch((error) => {
      console.error('Error removing drink:', error);
      res.status(500).json({ success: false, message: 'Unable to remove drink from the database', error: error.message });
    });
});

// Edit/Update a drink
app.put('/updateDrink/:id', (req, res) => {
  // Extract the drink ID from the request parameters
  const drinkId = req.params.id;

  // Extract the new name from the request body           ****Make sure the updated name is provides and is sent with the key "name"
  const newName = req.body.name;

  // Ensure that a new name is provided
  if (!newName) {
    return res.status(400).json({ success: false, message: 'New name must be provided for updating the drink' });
  }

  // Define the update operation
  const update = { $set: { name: newName } };

  // Use Mongoose to find the drink by ID and update it
  drinkSchema.findByIdAndUpdate(drinkId, update, { new: true })
    .then((updatedDrink) => {
      if (updatedDrink) {
        res.status(200).json({ success: true, message: `Successfully updated drink with ID ${drinkId} to ${updatedDrink.name}`, updatedDrink });
      } else {
        // possibly add alert if it would help on front end
        res.status(404).json({ message: 'Unable to update the drink in the database'});
      }
    })
    .catch((error) => {
      console.error('Error updating drink:', error);
      res.status(500).json({ success: false, message: 'Unable to update the drink in the database' });
    });
});




















// extras: 

// sessions/cookies for down the line
// bcrypt addition
