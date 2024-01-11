const express = require('express');
const mongoose = require('mongoose');
const app = express();
// route for creating new user:

app.post('/signup', userController.createUser, (req, res)  => {
    console.log('new user created')
    res.redirect(302, '/dashboard');
    // does react Router handle this redirect step?
});
// import for environmental variables - .config => when you type it autofills
require('dotenv').config();

const URI = `mongodb+srv://${db_userName}:${db_password}@axolotl.xogzh1q.mongodb.net/?retryWrites=true&w=majority`;

                                                // * = working on now


// take in json obj and observe static files

// routes for landing page -- localhost?

// login and sign up logic
    //app.post logic etc

// account creation logic *

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
