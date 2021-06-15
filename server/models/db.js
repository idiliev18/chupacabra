const dbConfig = require('../config/dbConfig');
const sql = require('mssql')
const request = new sql.Request()

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
            const result = await sql.query`SELECT 1+1`;
            console.log(result);
            this._connection = true;
        } catch (err) {
            console.log(err);
        }
    }
    async registerUser(firstName,lastName,age,city,phone,email,username,token,hashPassword){
        // await request.input('firstName', sql.NVarChar, firstName);
        // await request.input('lastName', sql.NVarChar, lastName);
        // await request.input('age', sql.Int, age);
        // await request.input('city', sql.NVarChar, city);
        // await request.input('phone', sql.VarChar, phone);
        // await request.input('email', sql.NVarChar, email);
        // await request.input('username', sql.VarChar, username);
        // await request.input('token', sql.VarChar, token);
        // await request.input('hashPassword', sql.VarChar, hashPassword);
        await sql.query("EXEC RegisterUser @FirstName = 'FIKI' ,@LastName = 'Storaro', @Age  = 42, @City  = 'Shumen', @Phone  = '+359177603828', @Username = 't1o546612nufgc46h3op', @Email = 'dtou32d144f66nk9go@cb.bg', @Token = 'dfdfdfdfdfdf', @PasswordHash = 'sdfhjkBKgadhfguyadfhjuyadfs'", (err, result) => {
            console.log(err);
            console.log(result);
        })
    }
    //private
    static _config = dbConfig.config;
    static _connection = false;
}

module.exports = db;
