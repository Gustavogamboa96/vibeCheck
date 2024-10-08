const { deleteUserById } = require("../repositories/userDAO");
const { dataResponse } = require("../utils/dataResponse");

async function deleteUser(username) {
    /**
     * service layer function to hamdle the deletion of a user based on their id
     */


    try {
        const response = await deleteUserById(username);
        const data = {}

        if (!response) {
            data.message = "Sorry something went wrong.";
        }

        data.message = `${username} deleted successfully`;

        return dataResponse(204, "success", data);

    } catch (error) {
        throw new Error(error.message);
    }

}

module.exports = { deleteUser }