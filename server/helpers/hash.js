const bcrypt = require("bcrypt");

async function hashPassword(password, saltRounds) {  
    const salt = await bcrypt.genSalt(saltRounds);
    console.log(await bcrypt.hash(password, salt));
    return await bcrypt.hash(password, salt);
}

module.exports.hashPassword = hashPassword;