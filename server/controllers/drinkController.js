const { Drink } = require('../models/models.js');

const drinkController = {};

//  // middleware for validating drinks
drinkController.drinkDataValidation = (req, res, next) => {
  // confirm required data
  const {drink, location} = req.body;
  // error status if incorrect
    if(!drink || !location){
      console.log('no drink or location data located in drinkDataValidation');
      res.locals.drinkVerified = false;
      return next();
    }else{
      console.log('drinkDataValidation passed check, moving to addDrink server.js post request');
      res.locals.drinkVerified = true;
      Drink.create({drink, location});
      return next();
    }
  }

  module.exports = drinkController;
