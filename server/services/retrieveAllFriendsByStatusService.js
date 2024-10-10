const { dataResponse } = require("../utils/dataResponse");
const friendShipDAO = require("../repositories/friendshipDAO");

async function retrieveAllFriendsByStatus(userId, status) {
    /**
     * service layer function to handle the retrieval of friends by given status
     * 
     * status by default should be accepted but can be changed to pending
     */
    try {
        const data = {}

        // block checks that status is valid query
        if (status !== "accepted" && status !== "pending") {
            data.message = "invalid - query parameter status can only be accepted or pending";
            return dataResponse(400, 'fail', data);
        }

        // DAO layer function to get all friends by status
        const retrievedData = await friendShipDAO.retrieveAllFriendsByStatus(userId, status);
        console.log(retrievedData);

        data.message = "all gucci";
        return dataResponse(200, 'success', data);
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { retrieveAllFriendsByStatus }