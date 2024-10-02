const { dataResponse } = require("../utils/dataResponse");
const userDAO = require("../repository/userDAO");
const jwt = require("jsonwebtoken");
require('dotenv').config()

async function login(username, password) {
    /**
     * service layer function to handle the login feature
     * 
     * username and password of type string and will be present and valid
     */

    try {
        // data object that will be returned
        const data = {};

        // repository layer function call to get user by username
        const returnedUsers = await userDAO.getUserByUsername(username);

        console.log(returnedUsers);

        // block checks if no user was found, if found then compares passwords
        if (returnedUsers.Count === 0) {
            data.message = `No user data found.`;
            data.registerURL = "someurl";
        } else {
            // since usernames should be unique, only 1 JSOn object should be present in the returnedUser
            const databasePassword = returnedUsers.Items[0].password;

            // block checks that passwords match
            if (databasePassword !== password) {
                data.message = "Username and/or Password do not match!"
                return dataResponse(401, "fail", data);
            } else {
                // array method to remove sensitive data from the returning data
                const newData = returnedUsers.Items.map(user => {
                    const { password, ...rest } = user;
                    return rest
                });

                // console.log(newData);

                // creating token with user info, newData should be an array of a single object
                let token = jwt.sign(newData[0], process.env.SECRET_KEY, {
                    expiresIn: "1d"
                })
                data.token = token;
            }
        }

        return dataResponse(200, "success", data);

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { login }