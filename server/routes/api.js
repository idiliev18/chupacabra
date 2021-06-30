const express = require('express');
let hash = require('../helpers/hash')
const validation = require('../helpers/validations');
const CryptoJS = require('crypto-js')
const logs = require('../models/log.js')
const db = require('../models/db');
const JSONModule = require('../helpers/JSON');
const emailer = require('../helpers/email')
const app = express();
const loggerManager = new logs();
const { errors } = require('../helpers/errors');

const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({
    extended: true
}));

let DB = new db();

/**
 * Post to the /login route
 * @param {string} route
 * @function
 * @returns
 * @async
 * 
 */
app.post('/login', async (req, res) => {
    // Logs information to Grafana
    loggerManager.logInfo(
        `User with email/username: ${req.body.email} is trying to login.`
    );

    // Receive x-www-form-urlencoded from front-end
    let loginData = req.body;
    let resJSON, recordSet;

    let isValid = validation.isLoginDataValid(loginData);
    if (isValid) {

        let salt = await DB.getSalt(loginData.email);
        let isSaltReturned = salt.length > 0;

        if (isSaltReturned) {
            recordSet = await DB.loginUser(loginData.email,
                await hash.hashPassword(loginData.password, salt)
            );

            let isLogged = recordSet[0].hasOwnProperty("Token");


            if (isLogged) {

                loggerManager.logInfo(
                    `User with email/username: ${loginData.email} is successfully logged.`
                );

                // Create JSON Response with Token and Token Expire date
                resJSON = JSONModule.
                    createJSONResponse(isLogged, recordSet[0], 'login')

            } else {
                loggerManager.logWarn(
                    `There is no an account with this email/username: ${loginData.email}`
                );

                // Create JSON Response with error message, which depends on error code
                resJSON = JSONModule.
                    createJSONResponse(isLogged, errors[recordSet[0].ReturnCode], 'login')
            }
        }
        else {
            loggerManager.logWarn(
                `Cannot get salt from database for user with email/username: ${loginData.email}`
            );

            resJSON = JSONModule.createJSONResponse(false, recordSet, 'login');
        }

    } else {
        resJSON = JSONModule.createJSONResponse(false, recordSet, 'login');

        // Logs information to Grafana
        loggerManager.logWarn(
            `Email/username: ${loginData.email} is not valid.`
        );
    }

    // Send respond
    res.send(resJSON);
});

/**
 * Post to the /register route
 * @param {string} route
 * @function
 * @returns
 * @async
 * 
 */
app.post('/register', async (req, res) => {
    loggerManager.logInfo(
        `User with email: ${req.body.email} is trying to register.`
    );

    // Receive x-www-form-urlencoded from client
    let regData = req.body;

    let resJSON;
    let recordSet = validation.isRegisterDataValid(regData);

    let salt = await hash.getSalt();
    console.log(salt);
    if (recordSet === true) {

        // The resultset from the db is saved in recordSet variable
        recordSet = await DB.registerUser(
            regData.firstName,
            regData.lastName,
            regData.age,
            regData.city,
            regData.phone,
            regData.email,
            regData.username,
            await hash.hashPassword(regData.password, salt),
            salt
        )

        let isRegistered = recordSet[0].hasOwnProperty("Token");

        if (isRegistered) {

            loggerManager.logInfo(
                `User with email: ${regData.email} is successfully register into the database.`
            );

            // Create JSON Response with Token and Token Expire date
            resJSON = JSONModule.createJSONResponse(true, recordSet[0], 'register')
            await emailer.sendVerificationEmail(regData.email, recordSet[0].Token)
        } else {
            loggerManager.logWarn(
                `Failed saving to database at user with email: ${regData.email}:\n
                    ${JSON.stringify(errors[recordSet[0].ReturnCode])
                    .split(',')
                    .join("\n\t    ")
                    .replace(/:/g, " - ")
                    .replace(/["{}]/g, "")
                }`
            );

            resJSON = JSONModule.createJSONResponse(false, recordSet[0], 'register')
        }
    }
    else {
        console.log(recordSet);
        loggerManager.logWarn(
            `Failed validation/s at user with email ${regData.email}:\n
            ${JSON.stringify(recordSet)
                .split(',')
                .join("\n\t    ")
                .replace(/:/g, " - ")
                .replace(/["{}]/g, "")
            }`
        );

        resJSON = JSONModule.createJSONResponse(false, recordSet, 'register');
    }
    //Send respond
    res.send(resJSON);
});

/**
 * Get to the /verify route
 * @param {string} route
 * @function
 * @returns
 * @async
 * 
 */

app.get('/verify/:token', async (req, res) => {
    let returnValue;
    let token = req.params.token;

    loggerManager.logInfo(`User with token: ${token} is verified`)

    // Checks if token is passed
    returnValue = await DB.verifyUser(token);

    if (returnValue[0].hasOwnProperty('Success')) {
        res.redirect('/');
    }
})

/**
 * Get to the /users route
 * @param {string} route
 * @function
 * @returns
 * @async
 * 
 */
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
        // Get public account information
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

/**
 * Post to the /forgot route
 * @param {string} route
 * @function
 * @returns
 * @async
 * 
 */

app.post('/forgot', async (req, res) => {
    let returnValue = await DB.generateForgotPasswordToken(req.body.username);
    loggerManager.logInfo(`User with username: ${req.body.username} is trying to reset her/his password`)

    if (returnValue) {
        emailer.sendForgotPassEmail(returnValue.Email, returnValue.Token);
        res.redirect('/')
    } else {
        loggerManager.logWarn("Unauthorized attempt");
        res.send('Unauthorized attempt');
    }
});

/**
 * Post to the /resetPassword route
 * @param {string} route
 * @function
 * @returns
 * @async
 * 
 */

app.post('/resetPassword', async (req, res) => {
    let data = req.body;
    let token = req.headers.authorization;

    let returnValue;
    let JSONResponse

    if (data.password === data.confirmPassword) {
        returnValue = await DB.resetPassword(token, CryptoJS.SHA256(data.password
            + process.env.salt).
            toString(CryptoJS.enc.Base32));

        if (returnValue[0].ReturnCode == 0) {
            JSONResponse = JSONModule.createJSONResponse(1, 'Success', 'reset');
            loggerManager.logInfo(`User with token: ${token}, successfully reset his/her password`);
        } else {
            JSONResponse = JSONModule.createJSONResponse(0, 'Failure', 'reset');
            loggerManager.logWarn(`User with token: ${token}, can not successfully reset his/her password`);
        }
    } else {
        JSONResponse = JSONModule.createJSONResponse(0, 'Failure', 'reset');
        loggerManager.logWarn(`User with token: ${token}, can not successfully reset his/her password`);
    }

    res.send(JSONResponse);
});

/**
 * Post to the /users/:username/settings route
 * @param {string} route
 * @function
 * @returns
 * @async
 * 
 */

app.post('/users/:username/settings', async (req, res) => {
    let returnValue, JSONResponse;

    // Checks if token is passed
    if (req.headers.authorization != undefined) {
        returnValue = await DB.updateUser(req.headers.authorization, req.body.firstName, req.body.lastName, req.body.email)
        JSONResponse = JSONModule.createJSONResponse(returnValue[0].hasOwnProperty("Success"), returnValue[0].hasOwnProperty("Success") ? returnValue[0] : errors[returnValue[0].ReturnCode], 'settings')
    } else {
        loggerManager.logWarn("Unauthorized attempt");
        res.send('Unauthorized attempt');
    }

    res.send(JSONResponse);
});

/**
 * Post to the /registerBoat route
 * @param {string} route
 * @function
 * @returns
 * @async
 * 
 */

app.post('/registerBoat', async (req, res) => {
    // Receive x-www-form-urlencoded from client
    let resJSON;
    let regData = req.body;
    let token = req.headers.authorization;
    let returnValue;

    loggerManager.logInfo(
        `User with token: ${token} is trying to register a boat.`
    );

    returnValue = await DB.registerBoat(
        token,
        regData.boatName,
        regData.Engine,
        regData.registrationNumber,
        regData.boatLicense,
        regData.seatsCount,
        regData.anchorLength,
        regData.lifeJacketsCount,
    )

    if (returnValue[0].hasOwnProperty("Success")) {
        loggerManager.logInfo(
            `Boat with name: ${regData.boatName} and license: ${regData.boatLicense} is successfully register into the database.`
        );
    } else {
        loggerManager.logWarn(
            `Boat with name: ${regData.boatName} and license: ${regData.boatLicense} is not successfully register into the database.`
        )
    }

    resJSON = JSONModule.createJSONResponse(returnValue[0].hasOwnProperty("Success"), returnValue[0].hasOwnProperty("Success") ? returnValue[0] : errors[returnValue[0].ReturnCode], 'registerBoat')

    //Send respond
    res.send(resJSON);
});

/**
 * Get to the /boats route
 * @param {string} route
 * @function
 * @returns
 * @async
 * 
 */

app.get('/boats', async (req, res) => {
    let token = req.headers.authorization;
    let returnValue;
    let JSONResponse;

    if (token != undefined) {
        returnValue = await DB.getBoatsInformation(token);

        if (returnValue.length == 0) {
            JSONResponse = JSONModule.createJSONResponse(0, { "reason": "Boats not found" }, "boat");
            loggerManager.logWarn(`User with token: ${token} can not access the boat`);
        } else {
            JSONResponse = JSONModule.createJSONResponse(1, returnValue, "boat");
            loggerManager.logInfo(`Boat with token: ${token} can access the boat`);
        }
    }

    res.send(JSONResponse);
})
// Export the api
module.exports = app;
