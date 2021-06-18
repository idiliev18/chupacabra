function createJSONResponse(isSuccess, data) {
    let returnJSONObject = new Object;

    if (isSuccess) {
        returnJSONObject.type = "register-success";
        returnJSONObject.data = new Object();
        returnJSONObject.data.token = data.token;
        returnJSONObject.data.expiresAt = data.expiresAt;
    } else {
        returnJSONObject.type = "register-failure";
        returnJSONObject.reasons = new Object();
        returnJSONObject.reasons.text = data.join(', ');
        returnJSONObject.reasons.fields = new Object();

        for (const key in data) {
            switch (data[key]) {
                case 'Invalid name':
                    returnJSONObject.reasons.fields.firstName = "Only letters are allowed";
                    break;
                case 'Invalid email':
                    returnJSONObject.reasons.fields.email = "The email is invalid";
                    break;
                case 'Invalid phone':
                    returnJSONObject.reasons.fields.telephoneNumber = "The phone is invalid";
                    break;
                case 'Invalid age':
                    returnJSONObject.reasons.fields.age = "Age is not in range or it\'s not a number";
                    break;
                default:
                    break;
            }
        }
    }

    return JSON.stringify(returnJSONObject);
}

module.exports.createJSONResponse = createJSONResponse;
