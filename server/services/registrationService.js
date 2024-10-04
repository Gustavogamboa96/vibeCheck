const userDAO = require("../repositories/userDAO")
const { dataResponse } = require("../utils/dataResponse")
const { v4: uuidv4 } = require("uuid")
const bcrypt = require("bcrypt")

/**
 * service layer function to handle the registration feature
 *
 * username password email of type string, and age of number type will be present and valid
 */

async function register(username, age, email, password) {
  try {
    const data = {}
    // awaits getUserByUsername query
    const returnedUser = await userDAO.getUserByUsername(username)

    // checks results of query to see if username already exists
    if (returnedUser && returnedUser.Count > 0) {
      data.message = "Username already taken"
      return dataResponse(401, "fail", data)
    } else {
      //if req.body is valid then function will attempt to generate user awaiting the creatUser function from userDAO
      try {
        const saltRounds = 10
        let hashedPassword = await bcrypt.hashSync(password, saltRounds)
        let unique_key = uuidv4()
        let user = await userDAO.createUser({
          username,
          age,
          email,
          password: hashedPassword,
          user_id: unique_key,
        })

        data.message = "User created successfully"
        return dataResponse(201, "success", data)
      } catch (createError) {
        data.message = "Failed to create new user"
        return dataResponse(500, "fail", data)
      }
    }
    //if getUserByUsername query fails
  } catch (err) {
    throw new Error(err.message)
  }
}

module.exports = { register }
