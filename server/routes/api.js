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
    //Receive x-www-form-urlencoded from front-end
    let loginData = req.body;
    let returnValue = true;
    let resJSON;

    loggerManager.logInfo(
        `User with email/username: ${loginData.email} is trying to login.`
    );

    let fields = ['email', 'password'];

    for (const key in fields) {
        if (loginData[fields[key]] == undefined) {
            return 0;
        }

        if (Array.isArray(loginData[fields[key]])) {
            loginData[fields[key]] = loginData[fields[key]][0];
        }
    }

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
                `There is no an account with this email/username: ${loginData.email}`
            );
        }

        resJSON = JSONModule.createJSONResponse(returnValue[0].hasOwnProperty("Token"), returnValue[0].hasOwnProperty("Token") ? returnValue[0] : errors[returnValue[0].ReturnCode], 'login')
    } else {
        resJSON = JSONModule.createJSONResponse(false, returnValue, login);

        loggerManager.logWarn(
            `Email/username: ${user.email} is not valid.`
        );
    }

    //Send respond
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
    // Receive x-www-form-urlencoded from client
    let resJSON;
    let blankPhone, tmpCity, blankCity, tmpPhone;
    let regData = req.body;
    let fields = ['firstName', 'lastName', 'age', 'email', 'username', 'password', 'phone', 'city'];

    for (const key in fields) {
        if (regData[fields[key]] == undefined) {
            return 0;
        }
        if (Array.isArray(regData[fields[key]])) {
            regData[fields[key]] = regData[fields[key]][0];
        }
    }

    if (regData.phone == '') {
        blankPhone = true;
        tmpPhone = regData.phone;
        regData.phone = '+359896603828';
    }

    if (regData.city == '') {
        blankCity = true;
        tmpCity = regData.city;
        regData.city = 'Yambol';
    }

    loggerManager.logInfo(
        `User with email: ${regData.email} is trying to register.`
    );

    let returnValue = validation.formValidation(regData, validation.registerValidations);

    regData.phone = blankPhone ? tmpPhone : regData.phone;
    regData.city = blankCity ? tmpCity : regData.city;

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

            await emailer.sendVerificationEmail(regData.email, returnValue[0].Token)
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
    let returnValue;

    loggerManager.logInfo(
        `User with token: ${regData.Token} is trying to register a boat.`
    );

    returnValue = await DB.registerBoat(
        regData.Token,
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
