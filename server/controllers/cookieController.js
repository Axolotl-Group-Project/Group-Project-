const User = require ('.//models/models.js');

const cookieController = {};

// //set cookie:
// cookieController.setCookie = (req, res, next) => {
//     const randomCookie = Math.floor(Math.random() * 100);
//     res.cookie('rememberme', randomCookie, {httpOnly: true});
//     //req.cookies; // what does this do?
//     return next();
// };

// // set SSIDCookie - store userID in cookie:

// cookieController.setSSIDCookie = async (req, res, next) => {
//     const {userName} = req.body;
//     try{
//         const user = await User.findOne({userName}).exec();
//         const userID = user._id.toString();
//         res.cookie('ssid', userID, {httpOnly: true});
//         res.locals.ssid = userID;
//         return next ();
//     } catch (err){
//         console.log('error in setting SSID cookie')
//         return next ({err})
//     }
// };

module.exports = cookieController;