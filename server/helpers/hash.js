const bcrypt = require("bcrypt");

/**
 * Function that hash password
 * @async
 * @function
 * @param {string} password Password of the user
 * @param {string} saltRounds The salt used for hashing
 * @returns JSON
 */
async function hashPassword(password, salt) {  
    return await bcrypt.hash(password, salt[0].Salt);
} 

async function getSalt() {  
    return await bcrypt.genSalt()
} 

function getHello(){
    return 'Hello';
}
module.exports.hashPassword = hashPassword;
module.exports.getSalt = getSalt;