const express = require('express');
const mongoose = require('mongoose');
const app = express();
// route for creating new user:

app.post('/signup', userController.createUser, (req, res)  => {
    console.log('new user created')
    res.redirect(302, '/dashboard');
    // does react Router handle this redirect step?
});
