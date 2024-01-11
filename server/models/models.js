const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// set URI from atlas:
//const MONGO_URI = '<insert URI link from atlas db>';

//connect to db:
// mongoose.connect(MONGO_URI, {dbName: 'bevibrevi'})
//     .then(() => console.log('Connected to Mongo DB.'))
//     .catch(err => console.log(err));

// set schema for the 'drinks' collection:
const drinkSchema = new Schema({
    drink: {type: String, required: true},
    location: {type: String, required: true},
    rating: Number,
    flavors: String,
    recovery: String,
    thoughts: String,
});
//create model for 'drinks' collection:
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