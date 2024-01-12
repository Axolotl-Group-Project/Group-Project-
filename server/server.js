// import for environmental variables - .config => when you type it autofills
require('dotenv').config();

// allows us to use 'mongoose' functionality
const mongoose = require('mongoose');

const app = express();

const URI = `mongodb+srv://${db_userName}:${db_password}@axolotl.xogzh1q.mongodb.net/?retryWrites=true&w=majority`;

const PORT = 3000;

// import controllers:
const userController = require('./controllers/userController.js');
const cookieController = require ('./controllers/cookieController.js')
const sessionController = require ('./controllers/sessionController.js')

// logic to test mongoose connection (connected to database) *

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


                                                // * = working on now


// take in json obj and observe static files

// routes for landing page -- localhost?


// route for creating new user:
app.post('/signup', userController.createUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res)  => {
    console.log('new user created')
    res.status(201).json(res.locals.userID);
});

// login and sign up logic
app.post('/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
    if(res.locals.verifiedUser) {
    console.log('found user in db')
     return res.status(201).json(res.locals.userID)
    }
    else {res.status(401).send('problem with username and/or password')};
});

// functionality to start the server

// route for adding a drink *      // similar logic for when I make a branch const addDrink = new drinkSchema({})
  
// middleware for validating drinks

drinkDataValidation = (req, res, next) => {
// confirm required data

// error status if incorrect

}

app.post('/addDrink', drinkDataValidation, (req, res) => {
// add a res 200, possibly try and catch blocks
  res.json({ success: true, message: 'Drink was added to the database' });
});

// route for deleting a drink

// edit/update a drink
  //error handling

// server: 
app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}...`); });

module.exports = app;





















// extras: 

// sessions/cookies for down the line
// bcrypt addition
