const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    user: { type: Schema.Types.ObjectId, ref: 'user' } //reference to the user who created drink 
});

//model for 'drinks' collection:
const Drink = mongoose.model('drink', drinkSchema);


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