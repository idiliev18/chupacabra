const bcrypt = require("bcrypt");

/**
 * Function that hash password
 * @async
 * @function
 * @param {string} password Password of the user
 * @param {string} saltRounds The salt used for hashing
 * @returns JSON
 */
async function hashPassword(password, saltRounds) {  
    const salt = await bcrypt.genSalt(saltRounds);
    console.log(await bcrypt.hash(password, salt));
    return await bcrypt.hash(password, salt);
}

module.exports.hashPassword = hashPassword;