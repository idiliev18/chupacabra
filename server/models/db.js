const dbConfig = require('../config/dbConfig');
const sql = require('mssql')
const logs = require('../models/log')
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
            console.log(err);
        }
    }

    async registerUser(firstName, lastName, age, city, phone, email, username, token, hashPassword) {
        const request = new sql.Request();
        await request.input('userFirstName', sql.NVarChar, firstName);
        await request.input('userLastName', sql.NVarChar, lastName);
        await request.input('userAge', sql.Int, age);
        await request.input('userCity', sql.NVarChar, city);
        await request.input('userPhone', sql.VarChar, phone);
        await request.input('userEmail', sql.NVarChar, email);
        await request.input('userUsername', sql.VarChar, username);
        await request.input('userToken', sql.VarChar, token);
        await request.input('userHashPassword', sql.VarChar, hashPassword);
        ``
        await request.query(
            `EXEC RegisterUser
            @FirstName = @userFirstName,
            @LastName = @userLastName,
            @Age  = @userAge,
            @City  = @userCity,
            @Phone  = @userPhone,
            @Username = @userUsername,
            @Email = @userEmail,
            @Token = @userToken,
            @PasswordHash = @userHashPassword`,
            (err, result) => {
                err != null ? () => { loggerManager.logError(err) } : 0;

                let logString = ["", "Taken email", "Taken Username", "Taken Phone"];

                if (logString != null && result.recordset[0].ReturnCode != 0) {
                    loggerManager.logWarn(
                        `There is a problem with registration of User wiht email: ${email} \n ${logString[result.recordset[0].ReturnCode]}`
                    )
                }
            }
        )
    }
    //private
    static _config = dbConfig.config;
    static _connection = false;
}

module.exports = db;
