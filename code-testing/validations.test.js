const vals = require('../server/helpers/validations');
const validations = vals.validations;

test("Should pass if the name is not shorter than the minimum length", () => {
    expect(validations.minLength("Gosho Picha", 8)).toBeTruthy();
});

test("Should pass if the name is not longer than the maximum length", () => {
    expect(validations.maxLength("Gosho Picha", 127)).toBeTruthy();
});

test("Should pass if the email is valid", () => {
    expect(validations.isEmailValid("vvelikova19@codingburgas.bg")).toBeTruthy();
});

test("Should pass if the email does not contain @", () => {
    expect(validations.isEmailValid("vvelikova19codingburgas.bg")).not.toBeTruthy()
});

test("Should pass if the email does not contain a username", () => {
    expect(validations.isEmailValid("@codingburgas.bg")).not.toBeTruthy();
});

test("Should pass if the email does not contain a domain", () => {
    expect(validations.isEmailValid("vvelikova19@")).not.toBeTruthy();
});

test("Should pass if the number is higher than the minimum", () => {
    expect(validations.minNumber(18, 0)).toBeTruthy();
});

test("Should pass if the number is lower than the maximum", () => {
    expect(validations.maxNumber(18, 127)).toBeTruthy();
});

test("Should pass if the name is valid", () => {
    expect(validations.isNameValid("Gosho Picha")).toBeTruthy();
});

test("Should pass if the name is not valid", () => {
    expect(validations.isNameValid("Наско якия")).toBeFalsy();
});

test("Should pass if the phone is valid", () => {
    expect(validations.isPhoneValid("+359894448698")).toBeTruthy();
} )



