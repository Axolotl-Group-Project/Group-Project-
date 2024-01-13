const { Drink } = require('../models/models.js');

const drinkController = {};

//  // middleware for validating drinks
drinkController.drinkDataValidation = async (req, res, next) => {
  const { drink, location } = req.body;
  if (!drink || !location) {
    res.locals.drinkVerified = false;
    return next();
  } else {
    try {
      const createdDrink = await Drink.create({ drink, location });
      res.locals.drinkVerified = true;
      res.locals.createdDrink = createdDrink;
      return next();
    } catch (error) {
      // Pass error to next middleware
      return next(error);
    }
  }
};


drinkController.deleteDrink = async (req, res, next) => {
  const drinkId = req.params._id;
  
  try {
    const removedDrink = await Drink.findByIdAndDelete(drinkId);
    
    if (removedDrink) {
      res.status(204).json({ success: true, message: `Successfully removed drink from the database` });
    } else {
      res.status(404).json({ success: false, message: `Drink with ID ${drinkId} was not found in the database` });
    }
  } catch (error) {
    console.log('Error removing drink: ', error);
    return next(error);
  }
};

drinkController.updateDrink = async (req, res, next) => {
  const drinkId = req.params.id;
  const newDrinkName = req.body.drink;

  if (!newDrinkName) {
    return res.status(400).json({ success: false, message: 'New name must be provided for updating the drink' });
  }

  const update = { $set: { drink: newDrinkName } };

  try {
    const updatedDrink = await Drink.findByIdAndUpdate(drinkId, update, { new: true });
    
    if (updatedDrink) {
      res.status(200).json({ success: true, message: `Successfully updated drink with ID ${drinkId}`, updatedDrink });
    } else {
      res.status(404).json({ success: false, message: 'Unable to update the drink in the database' });
    }
  } catch (error) {
    console.log('error updating drink')
    return next(error);
  }
};

drinkController.getAllDrinks = async (req, res, next) => {
  try {
      const drinks = await Drink.find({}); // Fetch all drinks
      res.locals.drinks = drinks; // Store drinks in res.locals for potential further use
      next(); 
      // Proceed to next middleware (or send response if this is the last middleware)
  } catch (error) {
      // Pass the error to the error-handling middleware
      console.log('error getting all drinks from getAllDrinks');
    next(error);
  };
};

module.exports = drinkController;