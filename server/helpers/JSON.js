function createJSONResponse(isSuccess, fields) {
    if (isSuccess) {
        let data = fields;
        return {
            "type": "register-success",
            data
        }
    } else {
        return {
            "type": "register-failure",
            "reason": {
                "text": "validation-fail",
                fields
            }
        }
    }


}

module.exports.createJSONResponse = createJSONResponse;
