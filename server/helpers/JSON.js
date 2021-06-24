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

function createProfileJSON(data){
    if(data.length == 0)
    {
        return({
           "type": "failure",
           "reason": "Error 404"
        })
    }
    else
    {
        return({
         "type": "success",
            "data": data[0]
         })
    }
}

module.exports.createJSONResponse = createJSONResponse;
module.exports.createProfileJSON = createProfileJSON;
