function createJSONResponse(isSuccess, data) {
    let returnJSONObject = new Object;

    if (isSuccess) {
        returnJSONObject.type = "register-success";
        returnJSONObject.data = new Object();
        returnJSONObject.data.token = data.token;
        returnJSONObject.data.expiresAt = data.expiresAt;
    } else {
        return {
            "type": "register-failure",
            "reason": {
                "text": "validation-fail",
                "fields": {
                    "firstName": `${data.firstName}`,
                    "lastName": `${data.lastName}`,
                    "username": `${data.username}`,
                    "email": `${data.email}`,
                    "password": `${data.password}`,
                    "age": `${data.age}`,
                    "city": `${data.city}`,
                    "telephoneNumber": `${data.phone}`,
                }
            }
        }
    }



    return JSON.stringify(returnJSONObject);
}

module.exports.createJSONResponse = createJSONResponse;
