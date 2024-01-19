const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// set URI from atlas:
const {DB_USERNAME, DB_PASSWORD} = process.env;
const MONGO_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@axolotl.xogzh1q.mongodb.net/?retryWrites=true&w=majority`;


// //connect to db:
// mongoose.connect(MONGO_URI, {dbName: 'axolotl'})
//     .then(() => console.log('Connected to Mongo DB.'))
//     .catch(err => console.log(err));


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

//  ATTEMPTED TO CLEAN UP MODELS PAGE TO ONLY HAVE MODEL/SCHEMA LOGIC
//  MOVED DB LOGIC TO SERVER.JS

// set schema for the 'drinks' collection:
const drinkSchema = new Schema({
    drink: {type: String, required: true},
    location: {type: String, required: true},
    rating: Number,
    flavors: String,
    recovery: String,
    thoughts: String,
});
//model for 'drinks' collection:
const Drink = mongoose.model('drink', drinkSchema);

//schema for users:
const userSchema = new Schema({
   userName: {type: String, required: true},
   password:  {type: String, required: true},
});

//model for 'users' collection:
const User = mongoose.model('user', userSchema);

// schema for session:
const sessionSchema = new Schema({
    cookieID: {type: String, required: true, unique: true },
    createdAt: {type: Date, expires: 30, default: Date.now }
})
//model for 'sessions':
const Session = mongoose.model('Session', sessionSchema);

//export models in object to be used in the controller:
module.exports = {
    Drink,
    User,
    Session,
};
// //**remember to import into controllers:
// const { Drink, User, Session } = require('../models/models.js')*/