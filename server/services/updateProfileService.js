const { dataResponse } = require("../utils/dataResponse");
const { updateProfileSettings } = require("../utils/updateProfileSettings");
const usersDAO = require("../repositories/userDAO");

async function updateProfile(userData, dataToUpdate, dataToDelete) {
    /**
     * service layer function to handle the 
     */
    try {

        // data object to return to controller layer
        const data = {};

        // querying user by id using repository layer function to make sure user exist and data matches
        const returnedUser = await usersDAO.findUserById(userData.userId);

        // block checks that user updating is only allowed to update his own profile
        if (userData.user_id !== userData.userId) {
            data.message = "sorry, you can only update your own profile";
            return dataResponse(401, "fail", data);
        }

        // block checks if user does not exists
        if (returnedUser.Count === 0) {
            data.message = "invalid user - user does not exist";
            return dataResponse(400, "fail", data);
        }

        // block checks if more than 1 user was returned
        if (returnedUser.Count > 1) {
            data.message = "error - more than 1 user found";
            return dataResponse(400, "fail", data);
        }

        //  block compares username and emails in db with information provided by JWT
        if (userData.email !== returnedUser.Items[0].email || userData.username !== returnedUser.Items[0].username) {
            data.message = "JWT email/username did not match with stored email/username";
            return dataResponse(400, 'fail', data);
        }

        // utility function to handle the updateSettings creation
        const updateSettings = updateProfileSettings(dataToUpdate, dataToDelete);

        // DAO layer function to update the profile based on the username
        const response = await usersDAO.updateProfile(userData.username, updateSettings);

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