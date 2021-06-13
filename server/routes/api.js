const express = require('express');
const validation = require('../helpers/validations');
const logs = require('../models/log.js')
const app = express();
const loggerManager = new logs();

app.use(express.urlencoded({
    extended: true
}));

app.post('/login', (req, res) => {
    //Receive x-www-form-urlencoded from front-end
    let user = req.body;

    loggerManager.logInfo(`User with email: ${user.email} is trying to login.`);

    //Validation - Need fixing
    if (validation.isDataValid('isEmailValid', user.email)) {
        //login();
    } else {
        loggerManager.logWarn(`Email: ${user.email} is not valid`);
    }


    //Login

    //Send respond
    res.send(user);
});

module.exports = app;