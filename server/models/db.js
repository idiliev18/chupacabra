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
            const result = await sql.query`SELECT 1+1`;
            console.log(result);
            this._connection = true;
        } catch (err) {
            console.log(err);
        }
    }

    //private
    static _config = dbConfig.config;
    static _connection = false;
}

module.exports = db;