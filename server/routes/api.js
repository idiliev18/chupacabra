const express = require('express');
var CryptoJS = require("crypto-js");
const validation = require('../helpers/validations');
const logs = require('../models/log.js')
const db = require('../models/db');
const userClass = require('../models/user');
const JSONModule = require('../helpers/JSON');
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

app.post('/register', async(req, res) => {
    let resJSON;
    //Receive x-www-form-urlencoded from front-end
    let regData = req.body;

    loggerManager.logInfo(
        `User with email: ${regData.email} is trying to register.`
    );

    let returnValue = validation.formValidation(regData, validation.registerValidations);

    //Validation
    if (returnValue === true) {
        returnValue = await DB.registerUser(
            regData.firstName,
            regData.lastName,
            regData.age,
            regData.city,
            regData.phone,
            regData.email,
            regData.username,
            CryptoJS.SHA256(regData.password+process.env.salt).
                                     toString(CryptoJS.enc.Base32)
        )
        console.log(returnValue);
    } else {
        resJSON = JSONModule.createJSONResponse(false, returnValue);

        loggerManager.logWarn(
            `Failed validation/s at user with email ${regData.email}:\n
            ${JSON.stringify(returnValue)
                .split(',')
                .join("\n\t    ")
                .replace(/:/g, " - ")
                .replace(/["{}]/g, "")
            }`
        );
    }

    //Send respond
    res.send(resJSON);
});

module.exports = app;
