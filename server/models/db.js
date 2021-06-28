const dbConfig = require('../config/dbConfig');
const sql = require('mssql');
const logs = require('../models/log.js');
const loggerManager = new logs();

class db {
    constructor() {
        if (!this._connection) {
            this.constructor.connectToDB();
        }
    }

    //public
    static async connectToDB() {
        try {
            await sql.connect(this._config);
            this._connection = true;
        } catch (err) {
            loggerManager.logError(JSON.stringify(err));
            console.log(err);
        }
    }

/**
 * Method that cheks is token valid
 * @function
 * @param {string} token - The token that will be checked
 */
    async verifyUser(token) {
        const request = new sql.Request();
        request.input('userToken', sql.NVarChar, token)

        let result;

        try {
            result = await request.query(
                `IF EXISTS(SELECT Id FROM Users WHERE Token = @userToken)
                           BEGIN
                           UPDATE Users SET IsVerified = 1 WHERE Token = @userToken
                           SELECT 0 AS Success
                           END
                           SELECT 7 AS ReturnCode`
            );
        } catch (err) {
            loggerManager.logError(JSON.stringify(err));
            return err;
        }

        return result.recordset;
    }

/**
 * Method which execute stored procedure ChangeUserData which  update information about the user if the given token is valid
 * @function
 * @param {string} token - The token that will be checked
 * @param {string} firstName - The new first name
 * @param {string} lastName - The new last name
 * @param {string} email - The new email
 */
    async updateUser(token, firstName, lastName, email) {
        const request = new sql.Request();
        request.input('userToken', sql.VarChar, token)
            .input('firstName', sql.NVarChar, firstName)
            .input('lastName', sql.NVarChar, lastName)
            .input('userEmail', sql.NVarChar, email)

        let result;

        try {
            result = await request.query(
                `EXEC ChangeUserData
                @Email = @userEmail,
                @FirstName = @firstName,
                @LastName = @lastName,
                @Token = @userToken`
            );
        } catch (err) {
            loggerManager.logError(JSON.stringify(err));
            return err;
        }

        return result.recordset;
    }

/**
 * Method which execute stored procedure GenerateForgotPasswordToken which generates reset password token
 * @function
 * @param {string} username - Username of the user who forgot its password
 */
    async generateForgotPasswordToken(username) {
        const request = new sql.Request();
        request.input('userUsername', sql.VarChar, username);

        let result;

        try {
            result = await request.query(`
                EXEC GenerateForgotPasswordToken
                @Username = @userUsername
            `);
        } catch (err) {
            loggerManager.logError(JSON.stringify(err));
            return err;
        }

        return (result.recordset == undefined ? false : result.recordset[0]);
    }

/**
 * Method which execute stored procedure RegisterBoat which register boats to the db
 * @function
 * @param {string} token - The token of the user who wants to register a boat
 * @param {string} name - Username of the user who forgot its password
 * @param {string} engine - Username of the user who forgot its password
 * @param {string} registrationNumber - Username of the user who forgot its password
 * @param {string} boatLicense - Username of the user who forgot its password
 * @param {string} seatsCount - Username of the user who forgot its password
 * @param {string} anchorLength - Username of the user who forgot its password
 * @param {string} lifeJacketsCount - Username of the user who forgot its password
 */
    async registerBoat(token, name, engine, registrationNumber, boatLicense, seatsCount, anchorLength, lifeJacketsCount) {
        const request = new sql.Request();
        request.input('userToken', sql.NVarChar, token)
            .input('boatName', sql.NVarChar, name)
            .input('boatEngine', sql.NVarChar, engine)
            .input('boatRegistrationNumber', sql.NVarChar, registrationNumber)
            .input('boatLicense', sql.NVarChar, boatLicense)
            .input('boatSeatsCount', sql.Int, seatsCount)
            .input('boatAnchorLength', sql.Int, anchorLength)
            .input('boatLifeJacketsCount', sql.Int, lifeJacketsCount);

        let result;

        try {
            result = await request.query(
                `EXEC RegisterBoat
                @Token = @userToken,
                @Name = @boatName,
                @Engine = @boatEngine,
                @RegistrationNumber = @boatRegistrationNumber,
                @BoatLicense = @boatLicense,
                @SeatsCount = @boatSeatsCount,
                @AnchorLength = @boatAnchorLength,
                @LifeJacketsCount = @boatLifeJacketsCount`
            );
        } catch (err) {
            loggerManager.logError(JSON.stringify(err));
            return err;
        }

        return result.recordset;
    }

    async registerUser(firstName, lastName, age, city, phone, email, username, hashPassword) {
        const request = new sql.Request();
        request.input('userFirstName', sql.NVarChar, firstName)
            .input('userLastName', sql.NVarChar, lastName)
            .input('userAge', sql.Int, age)
            .input('userCity', sql.NVarChar, city)
            .input('userPhone', sql.VarChar, phone)
            .input('userEmail', sql.NVarChar, email)
            .input('userUsername', sql.VarChar, username)
            .input('userHashPassword', sql.VarChar, hashPassword);

        let result;

        try {
            result = await request.query(
                `EXEC RegisterUser
                @FirstName = @userFirstName,
                @LastName = @userLastName,
                @Age  = @userAge,
                @City  = @userCity,
                @Phone  = @userPhone,
                @Username = @userUsername,
                @Email = @userEmail,
                @PasswordHash = @userHashPassword`
            );
        } catch (err) {
            loggerManager.logError(JSON.stringify(err));
            return err;
        }

        return result.recordset;
    }

    async loginUser(loginCredential, hashPassword) {
        const request = new sql.Request();

        request.input('userLoginCredential', sql.NVarChar, loginCredential)
               .input('userHashPassword', sql.VarChar, hashPassword);

        let result;

        try {
            result = await request.query(
                `EXEC LoginUser
                @LoginCredential = @userLoginCredential,
                @PasswordHash = @userHashPassword`
            );
        } catch (err) {
            loggerManager.logError(JSON.stringify(err));
            return err;
        }
        
        return result.recordset;
    }


    async getPublicProfileInformation(username) {
        const request = new sql.Request();
        request.input('userUsername', sql.VarChar, username)
        request.input('userToken', sql.VarChar, 'NULL')

        let result;

        try {
            result = await request.query(
                `EXEC GetProfileInformation
                @Username = @userUsername,
                @Token = @userToken`
            );

        } catch (err) {
            loggerManager.logError(JSON.stringify(err));
            return err;
        }

        return result.recordsets;
    }

    async getPrivateProfileInformation(username, token) {
        const request = new sql.Request();
        request.input('userUsername', sql.VarChar, username)
        request.input('userToken', sql.VarChar, token)

        let result;

        try {
            result = await request.query(
                `EXEC GetProfileInformation
                @Username = @userUsername,
                @Token = @userToken`)

        } catch (err) {
            loggerManager.logError(JSON.stringify(err));
            return err;
        }

        return result.recordsets;
    }

    async getBoatsInformation(token) {
        const request = new sql.Request();
        request.input('userToken', sql.VarChar, token)

        let result;

        try {
            result = await request.query(
                `EXEC GetBoats
                @Token = @userToken`)

        } catch (err) {
            loggerManager.logError(JSON.stringify(err));
            return err;
        }

        return result.recordsets;
    }

    async resetPassword(token, password){
        const request = new sql.Request();
        request.input('userToken', sql.VarChar, token)
        .input('userPasswordHash', sql.VarChar, password)

        let result;

        try {
            result = await request.query(
                `EXEC ResetPassword
                @Token = @userToken,
                @Password = @userPasswordHash`)

        } catch (err) {
            loggerManager.logError(JSON.stringify(err));
            return err;
        }

        return result.recordset;
    }

    //private
    static _config = dbConfig.config;
    static _connection = false;
}

module.exports = db;
