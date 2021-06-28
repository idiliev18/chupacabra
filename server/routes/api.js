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

app.post('/login', async (req, res) => {
    //Receive x-www-form-urlencoded from front-end
    let loginData = req.body;
    let returnValue = true;
    let resJSON;

    loggerManager.logInfo(
        `User with email: ${loginData.email} is trying to login.`
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

app.get('/verify/:token', async (req, res) => {
    let returnValue;
    let token = req.params.token;

    // Checks if token is passed
    returnValue = await DB.verifyUser(token);

    if (returnValue[0].hasOwnProperty('Success')) {
        res.redirect('/');
    }
})

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

app.post('/forgot', async (req, res) => {
    let returnValue = await DB.generateForgotPasswordToken(req.body.username);

    if(returnValue) {
        emailer.sendForgotPassEmail(returnValue.Email, returnValue.Token);
        res.redirect('/')
    } else {
        res.send('Unauthorized attempt');
    }
});

app.post('/resetPassword', async (req, res) => {
    let data = req.body;
    let token = req.headers.authorization;

    console.log(data);
    console.log(token);

    let returnValue;
    let JSONResponse

    if(data.password === data.confirmPassword){
        console.log('Vliza');
        returnValue = await DB.resetPassword(token, CryptoJS.SHA256(data.password
             + process.env.salt).
        toString(CryptoJS.enc.Base32));
            console.log(returnValue[0].ReturnCode);
        if(returnValue[0].ReturnCode == 0)
        {
            console.log("NE se chupq");
            JSONResponse = JSONModule.createJSONResponse(1, 'Success', 'reset')
        }else{
            JSONResponse = JSONModule.createJSONResponse(0, 'Failure', 'reset')

        }
    }else{
        JSONResponse = JSONModule.createJSONResponse(0, 'Failure', 'reset')

    }

    res.send(JSONResponse);
});

app.post('/users/:username/settings',async (req, res) =>{
    let returnValue, JSONResponse;
    console.log(req.body);
    // Checks if token is passed
    if (req.headers.authorization != undefined) {
        returnValue = await DB.updateUser(req.headers.authorization ,req.body.firstName, req.body.lastName,req.body.email)
        console.log(returnValue);
        JSONResponse = JSONModule.createJSONResponse(returnValue[0].hasOwnProperty("Success"), returnValue[0].hasOwnProperty("Success") ? returnValue[0] : errors[returnValue[0].ReturnCode], 'settings')
        // Check is there valid token

    }else{
        res.send('unauthorized attempt');
    }

    res.send(JSONResponse);
});

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
            `User with token: ${regData.Token} is successfully register into the database.`
        );
    }

    resJSON = JSONModule.createJSONResponse(returnValue[0].hasOwnProperty("Success"), returnValue[0].hasOwnProperty("Success") ? returnValue[0] : errors[returnValue[0].ReturnCode], 'registerBoat')

    //Send respond
    res.send(resJSON);
});

app.get('/boats', async (req, res) => {
    let token = req.headers.authorization;
    let returnValue;
    let JSONResponse;

    if(token != undefined){
        returnValue = await DB.getBoatsInformation(token);
        console.log(returnValue);
        if(returnValue.length == 0){
            JSONResponse = JSONModule.createJSONResponse(0, {"reason": "Boats not found"}, "boat")
        }else{
            JSONResponse = JSONModule.createJSONResponse(1, returnValue, "boat")
        }
    }

    res.send(JSONResponse);
})
//Code for converting binary into a image
//saves image into avatars with username given from frontend
//doesn't need to access the database in any way
//implement it when sashko is aroung to get the data
// POTENTIAL CODE
//const buffer = fs.readFileSync(path.resolve(__dirname,'./../avatars/'+req.headers.authorization+'.png'));
//fs.writeFileSync(path.resolve(__dirname,'./../avatars/'+req.headers.username+'.png'), buffer);
// app.post('/users/:username/changeProfilePicture', async (req, res) => {
//     const buffer = fs.readFileSync(path.resolve(__dirname,'./../avatars/logo.png'));
//     fs.writeFileSync(path.resolve(__dirname,'./../avatars/test.png'), buffer);
// });
module.exports = app;
