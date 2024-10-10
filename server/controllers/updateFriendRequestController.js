const { errorResponse } = require("../utils/errorResponse");
const { friendRequstUpdate } = require("../services/friendRequstUpdateService")

async function updateFriendRequest(req, res) {
    /**
     * controller layer function to handle the accepting/denying of a friend request
     * 
     * status - will be validated in middleware/service layer function
     */
    try {
        const { userId } = req.params;
        const { status } = req.body;

        const response = await friendRequstUpdate(userId, status);

        // responding to client with object data
        res.status(response.httpStatus).json({
            status: response.status,
            ...(response.data && { data: response.data }),
        })
    } catch (error) {
        console.log(error.message);
        const response = errorResponse(500, "Internal server error during loggin");
        res.status(response.httpStatus).json({
            message: response.message
        });
    }
}


module.exports = { updateFriendRequest };