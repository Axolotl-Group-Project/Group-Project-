
const { User } = require('../models/models.js');

const userController = {};
const bcrypt = require('bcrypt');
const saltRounds = 10;

//createUser - create and save a new User into the database.
userController.createUser = async (req, res, next) => {
    console.log('inside create user middleware')
    // destructure the usenamne and password from the request body
    const { userName, password } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = await User.create({ userName, password: hashedPassword });
      res.locals.userID = newUser._id;
      return next();
  } catch (err) {
      return next(err);
  }
};

//verifyUser - verify existing user in database
userController.verifyUser = async (req, res, next) => {
    const { userName, password } = req.body;
    
    try {
      const user = await User.findOne({ userName }).exec();
      if (!user) {
          res.locals.userVerified = false;
          console.log('User not found in verifyUser middleware');
          return next();
      } else {
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
              res.locals.userVerified = false;
              console.log('Password does not match in verifyUser middleware');
              return next();
          } else {
              res.locals.userID = user._id;
              console.log('User verified in verifyUser middleware');
              res.locals.userVerified = true;
              return next();
          }
      }
  } catch (error) {
      return next({ error });
  }
};
       


  module.exports = userController; 
