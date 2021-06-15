const express = require('express');
const crypto = require('crypto');
const validation = require('../helpers/validations');
const logs = require('../models/log.js')
const db = require('../models/db');
const userClass = require('../models/user');
const app = express();
const loggerManager = new logs();

app.use(express.urlencoded({
    extended: true
}));

let DB = new db();

app.post('/login', (req, res) => {

    //Receive x-www-form-urlencoded from front-end
    let user = req.body;

    loggerManager.logInfo(`User with email: ${user.email} is trying to login.`);

    //Validation
    if (validation.isDataValid(user.email, { 'isEmailValid': 1 })) {
        //login();
    } else {
        loggerManager.logWarn(`Email: ${user.email} is not valid`);
    }

    //Send respond
    res.send(user);
});

app.post('/register', (req, res) => {

    //Receive x-www-form-urlencoded from front-end
    let regData = req.body;
    console.log(regData);
    loggerManager.logInfo(`User with email: ${regData.email} is trying to register.`);

    //Validation
    if (validation.formValidation(regData,validation.registerValidations)) {
        DB.registerUser(regData.firstName,regData.lastName,regData.age,regData.city,regData.phone,regData.username,"TokenGoBRRRRRR","HashedPasswordGoBRRRRRRRRRRRRR")
    } else {
        loggerManager.logWarn(`Email: ${regData.email} is not valid`);
    }

    //Send respond
    res.send(regData);
});

module.exports = app;
