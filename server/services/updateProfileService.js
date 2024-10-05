const { dataResponse } = require("../utils/dataResponse");
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

        // object to hold the settings that will be put into the update params
        let updateSettings = {}
        updateSettings.ExpressionAttributeNames = {}
        updateSettings.ExpressionAttributeValues = {}
        updateSettings.removeString = "";
        updateSettings.setString = "";

        // block checks if there are any items that need to be udpated
        if (Object.keys(dataToUpdate).length > 0) {
            // creating a new set string
            let setString = "SET ";

            // iterating through the object to create the string
            Object.entries(dataToUpdate).forEach(([key, value]) => {
                setString += `#${key} = :${key}, `;
                updateSettings.ExpressionAttributeNames[`#${key}`] = `${key}`;
                updateSettings.ExpressionAttributeValues[`:${key}`] = value;
            })

            // removing the trailing comma
            setString = setString.slice(0, setString.length - 2);

            updateSettings.setString = setString;

        }

        // block checks if there are attributes to be deleted
        if (Object.keys(dataToDelete).length > 0) {
            // creating the removing string
            let removeString = "REMOVE ";

            // iterating through the object to create the string
            Object.entries(dataToDelete).forEach(([key, value]) => {
                removeString += `#${key}, `;
                updateSettings.ExpressionAttributeNames[`#${key}`] = `${key}`;
            })

            // removing the trailing comma
            removeString = removeString.slice(0, removeString.length - 2);

            updateSettings.removeString = removeString;

        }

        const response = await usersDAO.updateProfile(userData.username, updateSettings);
        console.log(response);

        data.message = "all good broh"
        return dataResponse(200, "success", data);
    } catch (error) {
        throw new Error(error.message);
    }
}


module.exports = { updateProfile }