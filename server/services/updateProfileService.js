const { dataResponse } = require("../utils/dataResponse");
const usersDAO = require("../repositories/usersDAO");

async function updateProfile(dataToUpdate, dataToDelete) {
    /**
     * service layer function to handle the 
     */
    try {

        // data object to return to controller layer
        const data = {};

        const response = await usersDAO.updateProfile();

        data.message = "all good broh"
        return dataResponse(200, "success", data);
    } catch (error) {
        throw new Error(error.message);
    }
}


module.exports = { updateProfile }