const { dataResponse } = require("../utils/dataResponse");

async function friendRequstUpdate(userId, status) {
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

        data.message = "add goooooood";
        return dataResponse(200, 'success', data);

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { friendRequstUpdate }