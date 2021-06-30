'use strict'
/**
 * Validations for every input
 */
const validations = {
    'minLength': function (data, minLength) {
        return data.length > minLength;
    },

    'maxLength': function (data, maxLength) {
        return data.length < maxLength;
    },

    'isEmailValid': function (data) {
        let pattern = /(([a-z]+)([._a-z0-9])([a-z0-9]+)).{1,64}(@)([a-z]+)([.a-z])([a-z])+/gmi;
        return data.match(pattern);
    },

    'isUsernameValid': function (data) {
        let pattern = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
        return data.match(pattern);
    },

    'minNumber': function (data, minNumber) {
        return data > minNumber;
    },

    'maxNumber': function (data, maxNumber) {
        return data < maxNumber;
    },

    'isNameValid': function (data) {
        let pattern = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
        return data.match(pattern);
    },

    'isPhoneValid': function (data) {
        let pattern = /\+3598[789]\d{7}/;
        return data.match(pattern);
    },

    'isNumber': function (data) {
        return !isNaN(data);
    },
};

/**
 * To check certain data if it is valid
 * @function
 * @param {string} data data to check
 * @param {object} toCheck For what to check
 * @returns {boolean} Is the data valid?
 */
function isDataValid(data, toCheck) {
    for (const key in toCheck) {
        if (!validations[key](data, toCheck[key])) {
            return false;
        }
    }

    return true;
};

/**
 * Function to validate the form received from client
 * @function
 * @param {object} dataToValidate Data that needs to be validated
 * @param {object} criterias Criterias for evaluating the date
 * @returns {(boolean|Array)} Booleant if the data is valid or array of errors
 */
function formValidation(dataToValidate, criterias) {
    let errorArr = {};
    for (const key in dataToValidate) {
        if (!isDataValid(dataToValidate[key], criterias[key])) {
            errorArr[key] = criterias[Object.keys(criterias[key])[0]];
        }
    }
    if (Object.keys(errorArr).length === 0) {
        return true;
    }

    return errorArr;
};

/**
 * Validations for registering form
 */
const registerValidations = {
    'firstName': { 'isNameValid': 1 },
    'lastName': { 'isNameValid': 1 },
    'username': { 'isUsernameValid': 1 },
    'age': { 'minNumber': 0, 'maxNumber': 127, 'isNumber': 1 },
    'city': { 'isNameValid': 1 },
    'phone': { 'isPhoneValid': 1 },
    'email': { 'isEmailValid': 1 },
    'isUsernameValid': 'Invalid username',
    'isNameValid': 'Invalid name',
    'isPhoneValid': 'Invalid phone',
    'minNumber': 'Invalid age',
    'isEmailValid': 'Invalid email'
};

/**
 * Validations for login form
 */
const loginValidations = {
    'email': { 'isEmailValid': 1 },
    'isEmailValid': 'Invalid email'
};


function isLoginDataValid(loginData) {

    let fields = ['email', 'password'];
    let isValid = true;

    for (const key in fields) {
        if (loginData[fields[key]] == undefined) {
            loginData.email = "";
            isValid = false;
        }

        if (Array.isArray(loginData[fields[key]])) {
            isValid = false;
        }
    }

    if (loginData.email.includes('@')) {
        if (!loginData.
            email.
            match(/(([a-z]+)([._a-z0-9])([a-z0-9]+)).{1,64}(@)([a-z]+)([.a-z])([a-z])+/gmi)) {
            isValid = false;
        }
    }

    return isValid;
}

function isRegisterDataValid(registerDataRef) {
    let registerData = Object.create(registerDataRef);

    let fields = ['firstName', 'lastName', 'age', 'email', 'username', 'password', 'phone', 'city'];
    let isValid = true;
    console.log(1,registerData);
    // Checks for empty non-requiered fields and remove them from the object 
    if(registerData.phone == null || registerData.phone == ''){
         registerData.phone = '+359888888888';
    }else if(registerData.city == null || registerData.city == ''){
         phone.city = 'Chupacabra';
    }
    console.log(registerData);

    for (const key in fields) {
        if (registerData[fields[key]] == undefined) {
            
            registerData[fields[key]] = '';
            isValid = false;
        }

        if (Array.isArray(registerData[fields[key]])) {
            isValid = false;
        }
    }

    isValid = formValidation(registerData, registerValidations)

    return isValid;
}

module.exports.isDataValid = isDataValid;
module.exports.formValidation = formValidation;
module.exports.registerValidations = registerValidations;
module.exports.loginValidations = loginValidations;
module.exports.validations = validations;
module.exports.isLoginDataValid = isLoginDataValid;
module.exports.isRegisterDataValid = isRegisterDataValid;
