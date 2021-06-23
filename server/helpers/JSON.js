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
            "reason": returnCodeToString(fields.ReturnCode)
        }
    }


}

function returnCodeToString(returnCode){
    switch(returnCode){
        case 1:
            return "Taken Email";
        case 2:
            return "Taken Username";
        case 3:
            return "Taken Phone";
        case 4:
            return "Incorrect credentials";

    }
}

module.exports.createJSONResponse = createJSONResponse;
