const { dataResponse } = require("../utils/dataResponse");
const friendShipDAO = require("../repositories/friendshipDAO");
const userDAO = require("../repositories/userDAO");

async function friendRequestUpdate(userId, targetUsername, status) {
    /**
     * service layer function to handle updating a friend request
     * 
     * if accepted, then a relation should be made with friendStatus: accepted bewteen both people on database
     * ex. username1 is friends with username2 ANNNND username2 is friends with username1
     * 
     * if denied, then friend request should be deleted from the database
     */
    try {
        const data = {};

        // block checks that body contains targetUsername
        if (!targetUsername || typeof targetUsername !== "string") {
            data.message = "invalid - targetUsername of type string is required";
            return dataResponse(400, 'fail', data);
        }

        const returnedUser = await userDAO.getUserByUsername(targetUsername);

        // block checks if the username in the body is invalid
        if (returnedUser.Count === 0) {
            data.message = "invalid - user not found";
            return dataResponse(404, 'fail', data);
        }
        // console.log(returnedUser)

        const { user_id: targetUserId } = returnedUser.Items[0];

        // block checks that status is valid type
        if (status !== "denied" && status !== "accepted") {
            data.message = "invalid - status can only be accepted or denied";
            return dataResponse(400, 'fail', data); s
        }


        const friendRequestSearch = await friendShipDAO.findFriendRequest(userId, targetUserId);

        // block checks to see if the friend request exists within the database
        if (friendRequestSearch.Count === 0) {
            data.message = "invalid - no friend request found";
            return dataResponse(404, 'fail', data);
        }

        // block accepts the friend request
        if (status === "accepted") {
            await friendShipDAO.acceptFriendRequest(userId, targetUserId);
            await friendShipDAO.sendFriendReuest(userId, targetUserId, "accepted");
        }

        // block handles the denying of the friend request
        // if (status === "denied") { }

        // block checks to make sure that a friend requests exists in the database

        data.message = "add goooooood";
        return dataResponse(200, 'success', data);

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { friendRequestUpdate }