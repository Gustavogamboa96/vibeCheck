const { dataResponse } = require("../utils/dataResponse");
const usersDAO = require("../repositories/userDAO")

async function validateUser(req, res, next) {
    /**
     * middleware function that validates user by checking the information in the
     * token, with the information retrieved from user search by id in the req.params
     * 
     */

    const data = {};
    const { ...userData } = req.user;
    const { userId } = req.params

    // querying user by id using repository layer function to make sure user exist and data matches
    const returnedUser = await usersDAO.findUserById(userId);

    // block checks that user updating is only allowed to update his own profile
    if (userData.user_id !== userId) {
        data.message = "sorry, you can only update your own profile";
        const response = dataResponse(401, "fail", data);
        return res.status(response.httpStatus).json({
            status: response.status,
            data
        });
    }

    if (returnedUser.Count === 0 || returnedUser.Count > 1) {
        // block checks if user does not exists, redundant check, token is still valid but the user is deleted
        if (returnedUser.Count === 0) {
            data.message = "invalid user - user does not exist";
        }

        // block checks if more than 1 user was returned, redundant check, someone forcefully make another user in the db manually
        if (returnedUser.Count > 1) {
            data.message = "error - more than 1 user found";
        }

        const response = dataResponse(400, 'fail', data);
        return res.status(response.httpStatus).json({
            status: response.status,
            data
        });
    }

    //  block compares username and emails in db with information provided by JWT, redundant unless someone changes the email directly in the db
    if (userData.email !== returnedUser.Items[0].email || userData.username !== returnedUser.Items[0].username) {
        data.message = "JWT email/username did not match with stored email/username";


        const response = dataResponse(400, 'fail', data);
        return res.status(response.httpStatus).json({
            status: response.status,
            data
        });
    }

    next();
}

module.exports = { validateUser }