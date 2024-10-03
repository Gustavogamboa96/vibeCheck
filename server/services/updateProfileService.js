const dataResponse = require("../utils/dataResponse");

async function updateProfile(dataBody) {
    /**
     * service layer function to handle the 
     */

    const data = {};

    data.message = "all good broh"
    return dataResponse(200, "success", data);
}


module.exports = { updateProfile }