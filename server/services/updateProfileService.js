const { dataResponse } = require("../utils/dataResponse");
const usersDAO = require("../repositories/usersDAO");

async function updateProfile(dataToUpdate, dataToDelete) {
    /**
     * service layer function to handle the 
     */
    try {

        // data object to return to controller layer
        const data = {};

        // querying user by id using repository layer function to make sure user exist and data matches
        const returnedUser = await usersDAO.findUserById("0e7ba505-b2c1-4889-a325-f19e27171be2");

        console.log(returnedUser);

        const response = await usersDAO.updateProfile();

        data.message = "all good broh"
        return dataResponse(200, "success", data);
    } catch (error) {
        throw new Error(error.message);
    }
}


module.exports = { updateProfile }