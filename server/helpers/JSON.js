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
            fields
        }
    }


}

module.exports.createJSONResponse = createJSONResponse;
