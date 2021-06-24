const express = require('express');
var CryptoJS = require("crypto-js");
const validation = require('../helpers/validations');
const logs = require('../models/log.js')
const db = require('../models/db');
const userClass = require('../models/user');
const JSONModule = require('../helpers/JSON');
const app = express();
const loggerManager = new logs();
const {errors} = require('../helpers/errors')

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

        console.log(errors[returnValue[0].ReturnCode]);
        resJSON = JSONModule.createJSONResponse(returnValue[0].hasOwnProperty("Token"), errors[returnValue[0].ReturnCode])
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

app.get('/users/:username', async(req, res) =>{

    //console.log(req.params.username);
    console.log(req.headers.authorization);

    let returnValue, JSONResponse;

    if(req.headers.authorization != undefined){
        returnValue = await DB.getPrivateProfileInformation(req.params.username, req.headers.authorization)

        //console.log("UMIRAM PREDI JSON");

        if(returnValue.length == 0)
        {
            
            JSONResponse = JSONModule.
                           createProfileJSON
                           (await DB.getPublicProfileInformation(req.params.username)); 
           
              //console.log("UMIRAM SLED JSON");
        }
        else
        {
            
            JSONResponse = JSONModule.
                           createProfileJSON(returnValue);
             
        }
    }else{
        returnValue = await DB.getPublicProfileInformation(req.params.username)

        if(returnValue.length == 0){
            res.status(404);
        }

        JSONResponse = JSONModule.
                        createProfileJSON(returnValue);
        
    }

    res.send(JSONResponse);
})


module.exports = app;
