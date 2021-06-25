const dbConfig = require('../config/dbConfig');
const sql = require('mssql')

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
            console.log(err);
        }
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
            return err;
        }

        return result.recordset;
    }


    async getPublicProfileInformation(username) {
        const request = new sql.Request();
        request.input('userUsername', sql.VarChar, username)
        request.input('userToken', sql.VarChar, 'NULL')

        let result;

        console.log(username);

        try {
            result = await request.query(
                `EXEC GetProfileInformation
                @Username = @userUsername,
                @Token = @userToken`
            );

        } catch (err) {
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
            return err;
        }

        return result.recordsets;
    }

    //private
    static _config = dbConfig.config;
    static _connection = false;
}

module.exports = db;
