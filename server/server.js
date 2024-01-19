// import for environmental variables - .config => when you type it autofills
require('dotenv').config();
const { DB_USERNAME,DB_PASSWORD, PORT } = process.env;
const DB = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@axolotl.xogzh1q.mongodb.net/?retryWrites=true&w=majority`;
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser())
app.use(cors());


// // import controllers:
const userController = require('./controllers/userController.js');
// const cookieController = require('./controllers/cookieController.js');
const sessionController = require('./controllers/sessionController.js');
const drinkController = require('./controllers/drinkController.js');


// // route for creating new user:
//add setSSIDCookie and startSession middlewares
app.post('/signup',
  userController.createUser,
  // cookieController.setSSIDCookie,
  // sessionController.startSession,
  (req, res) => {
    console.log('new user created')
    res.status(201).json("userID ->", res.locals.userID);
  });

// // login and sign up logic
//add setSSIDCookie and startSession middlewares after verifyUser
app.post('/login',
  userController.verifyUser,
  // cookieController.serSSIDCookie,
  // sessionController.startSession,
  (req, res) => {
    if (res.locals.userVerified) {
      // console.log('found user in db');
      return res.status(201).json(res.locals.userID);
    }
    else { res.status(401).send('problem with username and/or password') };
  });

//need route for getAllUsers
app.get('/users', userController.getAllUsers, (req, res) => {
  res.status(200).json({ success: true, users: res.locals.users });
});

//_________Routes for drinks___________
//eventually use a router to have all drinks route logic come from drinkController
//route for adding drink to drinkList
app.post('/addDrink', drinkController.drinkDataValidation);

// route for deleting a drink
app.delete('/removeDrink/:id', drinkController.deleteDrink);

// route for editing/updating drink
app.put('/updateDrink/:id', drinkController.updateDrink);

//route to get drinks list 
app.get('/drinks', drinkController.getAllDrinks);


// // //error handling used when return next(error)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ success: false, message });
});


app.listen(PORT, () => { console.log(`Listening on port ${PORT}...`); });

// connect to DB, then connect to Port9000
// mongoose
//   .connect(DB)
//   .then(() => {
//     console.log('connected to MongoDB');
//     app.listen(PORT, () => {
//       console.log(`IT'S OVER ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log(error.message, 'Error connecting to MongoDB');
//   });

// // logic that will display in terminal if mongoose to atlas encounters an error
// mongoose.connection.on('error', (err) => {
//   console.log('Mongoose connection error: ', err)
// });

// // logic that will display in terminal if mongoose to atlas is disconnected
// mongoose.connection.on('disconnected', () => {
//   console.log('Mongoose disconnected.')
// });

module.exports = app;


// // // bcrypt addition

// // // take in json obj and observe static files

// // extras: 

// // sessions/cookies for down the line
// // bcrypt addition
