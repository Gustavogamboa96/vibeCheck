const { updateProfile: updateProfileService } = require("../services/updateProfileService.js");

async function updateProfile(req, res) {
    /**
     * controller layer function to handle the updating of user info
     * 
     * req.body - for now can contain any kind of information
     * req.user - should contain information about the user, stored by the authentication middleware for the JWT
     */


    try {
        // just getting all the data from the body (I do not know what the user would like to change/add) 
        const { ...updatedData } = req.body;

        // this is should be stored in the req by the jwt authentication middle ware function
        // const { username, userId, userId } = req.user;

        // passing info into our service layer funciton
        const response = await updateProfileService(updatedData);

        return res.status(response.httpStatus).json({
            status: response.status,
            ...(response.data && { data: response.data })
        });

    } catch (error) {
        console.log(error.message);
        const response = errorResponse(500, "Internal server error during profile update");
        res.status(response.httpStatus).json({
            message: response.message
        });
    }



    return res.status(200).json({ message: "all good" });
}


module.exports = { updateProfile };