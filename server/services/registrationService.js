const userDAO = require("../repositories/userDAO")
const { dataResponse } = require("../utils/dataResponse")
const { v4: uuidv4 } = require("uuid")
const bcrypt = require("bcrypt")

async function register(username, age, email, password) {
    try {

        // made data
        const data = {};

        // awaits getUserByUsername query
        const returnedUser = await userDAO.getUserByUsername(username)

        // checks results of query to see if username already exists
        if (returnedUser && returnedUser.Count > 0) {
            data.message = "Username already taken"
            return dataResponse(401, "fail", data);
        } else {
            //if req.body is valid then function will attempt to generate user awaiting the creatUser function from userDAO
            try {
                const saltRounds = 10
                let hashedPassword = await bcrypt.hashSync(password, saltRounds)
                let unique_key = uuidv4()
                let data = await userDAO.createUser({
                    username,
                    age,
                    email,
                    password: hashedPassword,
                    user_id: unique_key,
                })

                console.log("Created new user:", data)
                data.message = "successfully created user"
                return dataResponse(201, "success", data)
            } catch (createError) {
                console.error("Failed to call createUser in userDAO: ", createError)
                return {
                    status: 500,
                    message: "Failed to create user",
                    error: createError.message,
                }
            }
        }
        //if getUserByUsername query fails
    } catch (err) {
        console.error("Failed to call getUserByUsername in userDAO: ", err)
        data.message = "Failed to check if username exists"
        return dataResponse(500, "success", data)
    }
}

module.exports = { register }
