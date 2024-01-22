// Logic in general needs to be completed so that session can be set up for user

const { Session } = require ('../models/models.js');

const sessionController = {};

sessionController.startSession = async(req, res, next) => {
    if(req.cookies.ssid) return next();
    const cookieID = res.locals.userID;
    console.log('startSession cookieId:', res.locals.userID)
    try {
        await Session.create({cookieID})
        .then(session => console.log('session.cookieId', session.cookieID))
      return next();
    } catch (error) {
        console.log('error in startSession middleware')
        return next(error)
    }
  };

  // if we need to verify user is logged in:
  // sessionController.isLoggedIn = async (req, res, next) => {
//     const sessionID = req.cookies.ssid;
//     // if no ssid is provided, flag false 
//     if (!sessionID) {
//         res.locals.loggedIn = false;
//         return next();
//         };
//     // look for ssid in db and update date, flag true
//     try {
//         const session = await Session.findOneAndUpdate({cookieID: sessionID}, {createdAt: Date.now() }, {upsert: true }).exec()
//         // if no session is found in db, flag false
//         if(!session) {
//             res.locals.loggedIn = false;
//             return next();
//         }
//         else {
//             console.log('user is loggedIn')
//             res.locals.loggedIn = true;
//             // update session to renew expiration date?
//             return next();
//         }
//     } catch (err) {
//         console.log('error in sessionController middleware', err)
//         return next(err);
//     }
// };
  
  module.exports = sessionController;