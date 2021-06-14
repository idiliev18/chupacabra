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

    'minNumber':function (data,minNumber){
        return data > minNumber;
    },

    'maxNumber':function (data,maxNumber){
        return data < maxNumber;
    },

    'isNameValid': function(data){
        let pattern = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
        return data.match(pattern);
    },

    'isPhoneValid': function (data) {
        let pattern = /\+3598[789]\d{7}/;
        return data.match(pattern);
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

module.exports.isDataValid = isDataValid;
