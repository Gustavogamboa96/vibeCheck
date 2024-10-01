const { dataResponse } = require("../utils/dataResponse");

function loginBodyValidation(req, res, next) {
    /**
     * middleware function to handle the checking of the body params
     * 
     * username - required
     * password - required
     */

    // destructuring the body
    const { username, password } = req.body;

    // block to handle any incorrect data
    if (!username || !password || typeof username !== "string" || typeof password !== "string") {

        let response = "";

        // block if both username and passwords are missing
        if (!username && !password) {
            // constructing response
            response = dataResponse(400, "fail", "username and password are required");
        }
        // block for missing username
        else if (!username) {
            // constructing repsonse
            response = dataResponse(400, "fail", "username is required");
        }
        // block for missing password
        else if (!password) {
            // constructing repsonse
            response = dataResponse(400, "fail", "password is required");
        }

        else if (typeof username !== "string" && typeof password !== "string") {
            // constructing response
            response = dataResponse(400, "fail", "invalid username and password types");
        }
        // block checks that params are valid strings
        else if (typeof username !== "string") {
            // constructing response
            response = dataResponse(400, "fail", "invalid username type");
        }

        // block checks that params are valid strings
        else if (typeof password !== "string") {
            // constructing response
            response = dataResponse(400, "fail", "invalid password type");
        }

        // returning response
        return res.status(response.httpStatus).json({
            status: response.status,
            message: response.message
        });
    }

    next();



}

module.exports = { loginBodyValidation }; 