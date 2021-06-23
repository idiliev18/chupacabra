'use strict'
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

    'minNumber': function (data, minNumber) {
        return data > minNumber;
    },

    'maxNumber': function (data, maxNumber) {
        return data < maxNumber;
    },

    'isNameValid': function (data) {
        let pattern = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
        return data.match(pattern);
    },

    'isPhoneValid': function (data) {
        let pattern = /\+3598[789]\d{7}/;
        return data.match(pattern);
    },

    'isNumber': function (data) {
        return !isNaN(data);
    },

    //TODO add username validation, issue #3
};

function isDataValid(data, toCheck) {

    for (const key in toCheck) {
        if (!validations[key](data, toCheck[key])) {
            return false;
        }
    }
    return true;
};

function areValuesEqualTo(obj, value) {
    for (var i in obj) {
        if (!(obj[i] == value)) {
            return false;
        }
    }

    return true;
}

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

const registerValidations = {
    'firstName': { 'isNameValid': 1 },
    'lastName': { 'isNameValid': 1 },
    'age': { 'minNumber': 0, 'maxNumber': 127, 'isNumber': 1 },
    'city': { 'isNameValid': 1 },
    'phone': { 'isPhoneValid': 1 },
    'email': { 'isEmailValid': 1 },
    'isNameValid': 'Invalid name',
    'isPhoneValid': 'Invalid phone',
    'minNumber': 'Invalid age',
    'isEmailValid': 'Invalid email'
};

module.exports.isDataValid = isDataValid;
module.exports.formValidation = formValidation;
module.exports.registerValidations = registerValidations;
module.exports.validations = validations;
