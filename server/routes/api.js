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
    // Receive x-www-form-urlencoded from client
    let regData = req.body;

    // loggerManager.logInfo(
    //     `User with email: ${regData.email} is trying to register.`
    // );

    let returnValue = validation.formValidation(regData, validation.registerValidations);

    // Validate client data
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
    let returnValue, JSONResponse;

    // Checks if token is passed
    if (req.headers.authorization != undefined) {
        returnValue = await DB.getPrivateProfileInformation(req.params.username, req.headers.authorization)

        // Check is there valid token
        if (returnValue.length == 0) {
            // Get public account information
            JSONResponse = JSONModule.
                createProfileJSON
                (await DB.getPublicProfileInformation(req.params.username));
        }
        else {
            JSONResponse = JSONModule.
                createProfileJSON(returnValue);
        }
    } else {
        // Get public accoutn information
        returnValue = await DB.getPublicProfileInformation(req.params.username)

        // Check is there found user
        if (returnValue.length == 0) {
            res.status(404);
        }

        JSONResponse = JSONModule.
            createProfileJSON(returnValue);

    }

    res.send(JSONResponse);
})

app.post('/registerBoat', async (req, res) => {
    let resJSON;
    // Receive x-www-form-urlencoded from client
    let regData = req.body;
    console.log(regData);
    let returnValue;
    loggerManager.logInfo(
        `User with token: ${regData.Token} is trying to register a boat.`
    );

        returnValue = await DB.registerBoat(
            regData.Token,
            regData.licenseId,
            regData.boatName,
            regData.Engine,
            regData.registrationNumber,
            regData.boatLicense,
            regData.seatsCount,
            regData.anchorLength,
            regData.lifeJacketsCount,
        )

        console.log(returnValue);
        if (returnValue[0].hasOwnProperty("Success")) {
            loggerManager.logInfo(
                `User with token: ${regData.Token} is successfully register into the database.`
            );
        }

        resJSON = JSONModule.createJSONResponse(returnValue[0].hasOwnProperty("Success"), returnValue[0].hasOwnProperty("Success") ? returnValue[0] : errors[returnValue[0].ReturnCode], 'registerBoat')

    //Send respond
    res.send(resJSON);
});


module.exports = app;
