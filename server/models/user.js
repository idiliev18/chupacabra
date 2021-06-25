'use strict'
const validations = require('../helpers/validations.js');

class User {
    // public
    constructor(id, firstName, lastName, age, city, phone, username, email, isVerified) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.city = city;
        this.phone = phone;
        this.username = username;
        this.email = email;
        this.isVerified = isVerified;
    }

    // private
    #id;
    #firstName;
    #lastName;
    #age;
    #city;
    #phone;
    #username;
    #email;
    #isVerified;

    // protected
}

// properties
Object.defineProperty(User, 'id', {
    get() {
        return this.id;
    },

    set(id) {
        if (!isNaN(id)) {
            this.id = id;
        } else {
            throw `Id: ${id} is not a number!`;
        }

    }
});

Object.defineProperty(User, 'firstName', {
    get() {
        return this.firstName;
    },

    set(firstName) {
        if (validations.isDataValid(firstName, { 'isNameValid': 1 })) {
            this.firstName = firstName;
        } else {
            throw `First name: ${firstName} is not a valid name!`;
        }
    }
});

Object.defineProperty(User, 'lastName', {
    get() {
        return this.lastName;
    },

    set(lastName) {
        if (validations.isDataValid(lastName, { 'isNameValid': 1 })) {
            this.lastName = lastName;
        } else {
            throw `Last name: ${lastName} is not a valid name!`;
        }
    }
});

Object.defineProperty(User, 'age', {
    get() {
        return this.age;
    },

    set(age) {
        if (validations.isDataValid(age, { 'minNumber': 0, 'maxNumber': 127 }) && !isNaN(age)) {
            this.age = age;
        } else {
            throw `Age: ${age} is not in range or is not a number!`;
        }
    }
});

Object.defineProperty(User, 'city', {
    get() {
        return this.city;
    },

    set(city) {
        if (validations.isDataValid(city, { 'isNameValid': 1 })) {
            this.city = city;
        } else {
            throw `City: ${city} is not a valid name for a city!`;
        }
    }
});

Object.defineProperty(User, 'phone', {
    get() {
        return this.phone;
    },

    set(phone) {
        if (validations.isDataValid(phone, { 'isPhoneValid': 1 })) {
            this.phone = phone;
        } else {
            throw `Phone number: ${phone} is not a Bulgarian number or not in (+359) format`;
        }

    }
});

Object.defineProperty(User, 'username', {
    get() {
        return this.username;
    },

    set(username) {
        //TODO check if username is valid when the function is made
        this.username = username;
    }
});

Object.defineProperty(User, 'email', {
    get() {
        return this.email;
    },

    set(email) {
        if (validations.isDataValid(email, { 'isEmailValid': 1 })) {
            this.email = email;
        } else {
            throw `Email: ${email} is not a valid email!`;
        }

    }
});

Object.defineProperty(User, 'isVerified', {
    get() {
        return this.isVerified;
    },

    set(isVerified) {
        if (typeof isVerified == 'boolean') {
            this.isVerified = isVerified;
        } else {
            throw `isVerified: ${isVerified} is not a boolean`;
        }

    }
});

module.exports = User;
