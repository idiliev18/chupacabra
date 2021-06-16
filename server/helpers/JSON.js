function createJSONResponse(isSuccess, data) {
    let returnJSONObject = new Object;

    if (isSuccess) {
        returnJSONObject.type = "register-success";
        returnJSONObject.data.token = data.token;
        returnJSONObject.data.expiresAt = data.expiresAt;
    } else {
        returnJSONObject.type = "register-failure";
        returnJSONObject.reasons = data;
    }

    return JSON.stringify(returnJSONObject);
}

module.exports.createJSONResponse = createJSONResponse;