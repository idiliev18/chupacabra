function createJSONResponse(isSuccess, fields, type) {
    if (isSuccess) {
        let data = fields;
        return {
            "type": type + "-success",
            data
        }
    } else {
        return {
            "type": type + "-failure",
            fields
        }
    }
}

function createProfileJSON(data) {

    console.log(data);
    if (data[0].length == 0) {
        return ({
            "type": "user-failure",
            "reason": "Error 404"
        })
    }
    else {
        let tmp = {
            "type": "user-success",
            "data": data[0][0]
        }


        tmp.data.roles = data[1].map((role)=>{return role.RoleName});

        return tmp;
    }
}

module.exports.createJSONResponse = createJSONResponse;
module.exports.createProfileJSON = createProfileJSON;
