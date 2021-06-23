function createJSONResponse(isSuccess, fields) {
    let returnJSONObject = new Object;
    if (isSuccess) {
        returnJSONObject.type = "register-success";
        returnJSONObject.data = new Object();
        returnJSONObject.data.token = fields.token;
        returnJSONObject.data.expiresAt = fields.expiresAt;
    } else {
        return {
            "type": "register-failure",
            "reason": {
                "text": "validation-fail",
                fields
            }
        }
    }



    return JSON.stringify(returnJSONObject);
}

module.exports.createJSONResponse = createJSONResponse;
