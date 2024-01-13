
const { User } = require('../models/models.js');

const userController = {};
//const bcrypt = require('bcrypt');

//createUser - create and save a new User into the database.
userController.createUser = (req, res, next) => {
    // destructure the usenamne and password from the request body
    const { userName, password } = req.body;
  
    // create document in the User collection within database
    User.create({ userName, password })
      // document will have username and password from the request as properties
      .then((user) => {
        //save user _id to res.locals
        res.locals.userID = user._id;
        return next();
      })
      .catch(err => {
        return next(err)})
  };

//verifyUser - verify existing user in database
userController.verifyUser = (req, res, next) => {
    const { username, password } = req.body;
  // find matching "username" document in the User collection within database
  User.findOne({ username })
    .exec()
    .then((user) => {
      if (!user) {
        res.locals.userVerified = false;
        return next();

      } 
      // query to db successfully finds user
      else {
        res.locals.userID = user._id; 

        res.locals.userVerified = true;
        return next();
      }
      })
    .catch((error) => 
      next({ error }));
};
       


  module.exports = userController; 