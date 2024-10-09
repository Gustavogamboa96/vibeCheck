const { getUserByUsername } = require("../repositories/userDAO");
const { sendFriendReuest } = require("../repositories/friendshipDAO");
const { dataResponse } = require("../utils/dataResponse");

async function friendRequest(userId, username) {
    /**
     * service layer function to handle friend request
     *
     *  userId will be present but username might not 
     */
    try {
        const data = {};

        // block checks that username is valid
        if (!username || typeof username !== 'string') {
            data.message = "invalid - username of type string is required";
            return dataResponse(400, 'fail', data);
        }

        // calling the DAO layer function for user to get user by username
        const returnedUser = await getUserByUsername(username);

        // block to see if no user is found by username
        if (returnedUser.Count === 0) {
            data.message = `invalid - no user found with username: ${username}`;
            return dataResponse(404, 'fail', data);
        }

        // block checks if more than 1 user is found
        if (returnedUser.Count > 1) {
            data.message = `invalid - ${returnedUser.Count} users found with the username: ${username}`;
            return dataResponse(404, 'fail', data);
        }

        // getting the response from sending a friend request
        const response = await sendFriendReuest(userId, returnedUser.Items[0].user_id);

        data.message = "add good";
        return dataResponse(200, 'success', data);
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { friendRequest }