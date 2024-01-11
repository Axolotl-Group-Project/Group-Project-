// allows us to use 'mongoose' functionality
const mongoose = require('mongoose');

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
});

const express = require('express');
const mongoose = require('mongoose');
const app = express();


// import for environmental variables - .config => when you type it autofills
require('dotenv').config();

const URI = `mongodb+srv://${db_userName}:${db_password}@axolotl.xogzh1q.mongodb.net/?retryWrites=true&w=majority`;

                                                // * = working on now


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

// logic to test mongoose connection (connected to database) *
  //error handling

// functionality to start the server

// root for adding a drink *

    // similar logic for when I make a branch const addDrink = new drinkSchema({})

// route for deleting a drink

// edit/update a drink





















// extras: 

// sessions/cookies for down the line
// bcrypt addition
