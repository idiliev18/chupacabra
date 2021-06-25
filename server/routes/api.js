const express = require('express');
var CryptoJS = require("crypto-js");
const validation = require('../helpers/validations');
const logs = require('../models/log.js')
const db = require('../models/db');
const JSONModule = require('../helpers/JSON');
const app = express();
const loggerManager = new logs();
const { errors } = require('../helpers/errors')

app.use(express.urlencoded({
    extended: true
}));

let DB = new db();

app.post('/login', async (req, res) => {
    //Receive x-www-form-urlencoded from front-end
    let loginData = req.body;
    let returnValue = true;
    let resJSON;

    let password = 123233;
    let securedPassword = (password+"fikretchu");



    loggerManager.logInfo(
        `User with email: ${loginData.email} is trying to login.`
    );

    if (loginData.email.includes('@')) {
        returnValue = validation.formValidation(loginData, validation.loginValidations);
    }

    //Validation
    if (returnValue) {
        returnValue = await DB.loginUser(loginData.email,
            CryptoJS.SHA256(loginData.password + process.env.salt).
                toString(CryptoJS.enc.Base32)
        );

        if (returnValue[0].hasOwnProperty("Token")) {
            loggerManager.logInfo(
                `User with email/username: ${loginData.email} is successfully logged.`
            );
        } else {
            loggerManager.logWarn(
                `There is no an account with this Username: ${loginData.email}`
            );
        }

        resJSON = JSONModule.createJSONResponse(returnValue[0].hasOwnProperty("Token"), returnValue[0].hasOwnProperty("Token") ? returnValue[0] : errors[returnValue[0].ReturnCode], 'login')
    } else {
        resJSON = JSONModule.createJSONResponse(false, returnValue, login);

        loggerManager.logWarn(
            `Email: ${user.email} is not valid.`
        );
    }

    //Send respond
    res.send(resJSON);
});

app.post('/register', async (req, res) => {
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
            CryptoJS.SHA256(regData.password + process.env.salt).
                toString(CryptoJS.enc.Base32)
        )


        if (returnValue[0].hasOwnProperty("Token")) {
            loggerManager.logInfo(
                `User with email: ${regData.email} is successfully register into the database.`
            );
        } else {
            loggerManager.logWarn(
                `Failed saving to database at user with email: ${regData.email}:\n
                ${JSON.stringify(errors[returnValue[0].ReturnCode])
                    .split(',')
                    .join("\n\t    ")
                    .replace(/:/g, " - ")
                    .replace(/["{}]/g, "")
                }`
            );
        }

        resJSON = JSONModule.createJSONResponse(returnValue[0].hasOwnProperty("Token"), returnValue[0].hasOwnProperty("Token") ? returnValue[0] : errors[returnValue[0].ReturnCode], 'register')
    } else {
        loggerManager.logWarn(
            `Failed validation/s at user with email ${regData.email}:\n
            ${JSON.stringify(returnValue)
                .split(',')
                .join("\n\t    ")
                .replace(/:/g, " - ")
                .replace(/["{}]/g, "")
            }`
        );

        resJSON = JSONModule.createJSONResponse(false, returnValue, 'register');
    }

    //Send respond
    res.send(resJSON);
});

app.get('/users/:username', async (req, res) => {

    //console.log(req.params.username);
    console.log(req.headers.authorization);

    let returnValue, JSONResponse;

    if (req.headers.authorization != undefined) {
        returnValue = await DB.getPrivateProfileInformation(req.params.username, req.headers.authorization)

        console.log(returnValue);

        if (returnValue.length == 0) {
            JSONResponse = JSONModule.
                createProfileJSON
                (await DB.getPublicProfileInformation(req.params.username));
        }
        else {
            JSONResponse = JSONModule.
                createProfileJSON(returnValue);
        }
    } else {
        returnValue = await DB.getPublicProfileInformation(req.params.username)

        console.log();
        if (returnValue.length == 0) {
            res.status(404);
        }

        JSONResponse = JSONModule.
            createProfileJSON(returnValue);

    }

    res.send(JSONResponse);
})


module.exports = app;
