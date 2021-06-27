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


    async registerBoat(token,licenseId, name, engine, registrationNumber, boatLicense, seatsCount, anchorLength,lifeJacketsCount) {
        const request = new sql.Request();
        request.input('userToken', sql.NVarChar, token)
            .input('boatLicenseId', sql.NVarChar, licenseId)
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
                @LicenseId = @boatLicenseId,
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

    async getBoatsInformation(token){
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

    //private
    static _config = dbConfig.config;
    static _connection = false;
}

module.exports = db;
