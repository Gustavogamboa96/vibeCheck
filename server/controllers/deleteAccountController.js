const { deleteUser } = require("../services/deleteAccountService")
const { errorResponse } = require("../utils/errorResponse");

async function deleteAccount(req, res) {
    /**
     * controller layer function to handle the deleting of a user profile
     * 
     * expects the user id in the route params
     */

    try {
        const { username } = req.user;

        // calling our service layer function, returns an object
        const response = await deleteUser(username);

        // responding to client with object data
        return res.status(response.httpStatus).send();
    } catch (error) {
        console.log(error.message);
        const response = errorResponse(500, "Internal server error during loggin");
        res.status(response.httpStatus).json({
            message: response.message
        });
    }

}

module.exports = {
    deleteAccount
}