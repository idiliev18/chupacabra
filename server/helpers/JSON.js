function createJSONResponse(isSuccess, fields,type) {
    if (isSuccess) {
        let data = fields;
        return {
            "type": type+"-success",
            data
        }
    } else {
        return {
            "type": type+"-failure",
            fields
        }
    }


}

module.exports.createJSONResponse = createJSONResponse;
