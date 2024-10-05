const { dataResponse } = require("../utils/dataResponse");
const { updateProfileSettings } = require("../utils/updateProfileSettings");
const usersDAO = require("../repositories/userDAO");

async function updateProfile(reqUsername, dataToUpdate, dataToDelete) {
    /**
     * service layer function to handle the 
     */
    try {

        // data object to return to controller layer
        const data = {};

        // utility function to handle the updateSettings creation
        const updateSettings = updateProfileSettings(dataToUpdate, dataToDelete);

        // DAO layer function to update the profile based on the username
        const response = await usersDAO.updateProfile(reqUsername, updateSettings);

        // extracting the values that should not be returned in the http response
        const { username, email, password, age, user_id, ...responseData } = response.Attributes;

        data.username = response.Attributes.username;
        data.updatedItems = {
            ...responseData
        }
        return dataResponse(200, "success", data);
    } catch (error) {
        throw new Error(error.message);
    }
}


module.exports = { updateProfile }