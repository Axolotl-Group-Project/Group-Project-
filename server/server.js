// import for environmental variables - .config => when you type it autofills
require('dotenv').config();

const express = require ('express');
const app = express();

app.use(express.json());

//const cookieParser = require('cookie-parser');
//app.use(cookieParser())

const PORT = 9000;

// // import controllers:
const userController = require('./controllers/userController.js');
//const cookieController = require ('./controllers/cookieController.js');
// const sessionController = require ('./controllers/sessionController.js')
const drinkController = require('./controllers/drinkController.js');


// // route for creating new user:
app.post('/signup', userController.createUser, (req, res)  => {
    console.log('new user created')
    res.status(201).json(res.locals.userID);
});

// // login and sign up logic
app.post('/login', userController.verifyUser, (req, res) => {
    if(res.locals.userVerified) {
    console.log('found user in db');
     return res.status(201).json(res.locals.userID);
    }
    else {res.status(401).send('problem with username and/or password')};
});


// //     // route for adding a drink 
app.post('/addDrink', drinkController.drinkDataValidation, (req, res) => {

    if(res.locals.drinkVerified){
      res.status(201).json({ success: true, message: 'Drink was added to the database' });
    }
    else{
      console.log('Error adding drink from drinkDataValidation:', error);
      res.status(400).json({ success: false, message: 'Unable to add drink to the database' });;
    }
  });

// route for deleting a drink

app.delete('/removeDrink/:id', drinkController.deleteDrink);

// route for editing/updating drink
app.put('/updateDrink/:id', drinkController.updateDrink);

app.get('/drinks', drinkController.getAllDrinks, (req, res) => {
    res.status(200).json({ success: true, drinks: res.locals.drinks });
});

  
// // //error handling
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ success: false, message });
});

// // // server: 
app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}...`); });

module.exports = app;    


// // // bcrypt addition

// // // take in json obj and observe static files

// // extras: 

// // sessions/cookies for down the line
// // bcrypt addition
