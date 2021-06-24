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
