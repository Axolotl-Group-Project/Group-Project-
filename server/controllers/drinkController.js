const { Drink } = require('../models/models.js');

//eventually use this bring all drink logic/routes to this controller
// import express from 'express';
// const router = express.Router();

const drinkController = {};

drinkController.drinkDataValidation = async (req, res, next) => {
  const { drink, location, rating, flavors, thoughts, recovery } = req.body;
  try {
    if (!drink || !location) {
     return res.status(400).send({ message: 'missing some required data' })
    }
    // ability to add additional fields related to the schema
    const createdDrink = await Drink.create({ drink, location, rating, flavors, thoughts, recovery });
    return res.status(201).send(`${createdDrink.drink} added to list!`)
  } catch (error) {
    console.log(err.message,' Error from with in drinkValidation route');
    res.status(500).send({message: err.message});
  }
};

drinkController.deleteDrink = async (req, res, next) => {
  // const drinkName = req.params.name, then figure out how to reconfigure the await statement
  const drinkId = req.params.id;

  try {
    // revise after changing the .id to .name
    const removedDrink = await Drink.findByIdAndDelete(drinkId)
    if (removedDrink) {
      // console.log('we have entered the removedDrink conditional');
      // this status should be returned on server.js
      res.status(200).json({ success: true, message: `Successfully removed drink from the database` });
    } else {
      res.status(404).json({ success: false, message: `Drink with ID ${drinkId} was not found in the database` });
    }
  } catch (error) {
    console.log('Error removing drink: ', error);
    return next(error);
  }
};

drinkController.updateDrink = async (req, res, next) => {
  // note that the logic for new drink name only allows for a drink name to be changed
  // would need to do similar for each additional field in the model
  const drinkId = req.params.id;
  const newDrinkName = req.body.drink;
  const newDrinkLocation = req.body.location;
  const newDrinkFlavors = req.body.flavors;
  const newDrinkThoughts = req.body.thoughts;
  const newDrinkRecovery = req.body.recovery;
  const newDrinkRating = req.body.rating;

  //declare new variables for diff fields to change as above

  if (!newDrinkName && !newDrinkLocation && !newDrinkRecovery && !newDrinkThoughts && !newDrinkFlavors && !newDrinkRating) {
    return res.status(400).json({ success: false, message: 'Missing required information for drink' });
  }
  //const update = { $set: { drink: newDrinkName, location: newDrinkLocation } };
  const updateFields = req.body;


  try {
    //const updatedDrink = await Drink.findByIdAndUpdate(drinkId, update, { new: true });
    const updatedDrink = await Drink.findByIdAndUpdate(
      drinkId,
      { $set: updateFields },
      { new: true }
    );

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
//repeat above code for each field that might change

drinkController.getAllDrinks = async (req, res, next) => {
  try {
    const drinkList = await Drink.find({}); // Fetch all drinks
    res.status(200).json({ success: true, drinks: drinkList });

  } catch (error) {
    // Pass the error to the error-handling middleware
    console.log('error getting all drinks from getAllDrinks');
    res.status(500).send({ message: error.message })
  };
};

module.exports = drinkController;