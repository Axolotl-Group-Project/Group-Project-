const { Session } = require ('../models/models.js');

const sessionController = {};

sessionController.isLoggedIn = async (req, res, next) => {
    // if no ssid is provided, return false 
    if (!req.cookies.ssid) {
        res.locals.loggedIn = false;
        return next();
        };
    // look for ssid in db:
    try {
        const session = await Session.findOne({cookieID: req.cookies.ssid}).exec()
        // if no session is found in db, return false
        if(!session) {
            res.locals.loggedIn = false;
            return next();
        }
        else {
            console.log('user is loggedIn')
            res.locals.loggedIn = true;
            // update session to renew expiration date?
            return next();
        }
    } catch (err) {
        return next(err);
    }
};

sessionController.startSession = async(req, res, next) => {
    const cookieID = res.locals.userID;
    console.log('startSession cookieId:', res.locals.userID)
    try {await Session.create({cookieID})
      .then(session => console.log('session.cookieId', session.cookieID))
      return next();
    } catch{(error => next({error}))}
  };
  
  module.exports = sessionController;