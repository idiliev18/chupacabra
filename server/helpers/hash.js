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
    console.log('Nasoliha me');
    console.log(salt);
    return await bcrypt.hash(password, salt);
} 

async function getSalt() {  
    console.log('VLIZA ZA SOL');
    return await bcrypt.genSalt()
} 

function getHello(){
    return 'Hello';
}
module.exports.hashPassword = hashPassword;
module.exports.getSalt = getSalt;