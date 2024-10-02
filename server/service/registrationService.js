const userDAO = require("../repository/userDAO")
const { v4: uuidv4 } = require("uuid")

async function register(username, age, email, password) {
  try {
    // awaits getUserByUsername query
    const returnedUser = await userDAO.getUserByUsername(username)

    // checks results of query to see if username already exists
    if (returnedUser && returnedUser.Count > 0) {
      console.log("username already taken")
      return { status: 400, message: "Username already taken" }
    } else {
      // checks if all fields present
      if (!username || !email || !password || !age) {
        return {
          status: 400,
          message: "username, age, email, and password are required",
        }
      }
      //checks if username is of valid length
      if (username.length < 7 || username.length == 0) {
        return {
          status: 400,
          message: "username must be at least 7 characters",
        }
      } else if (username.length > 25) {
        return {
          status: 400,
          message: "username must be no longer than 25 characters",
        }
      }
      //checks if password is of valid length
      if (password.length < 7 || password.length == 0) {
        return {
          status: 400,
          message: "password must be at least 7 characters",
        }
      } else if (password.length > 20) {
        return {
          status: 400,
          message: "password must be no longer than 20 characters",
        }
      }

      //checks if email is valid
      if (!email.includes("@") || !email.includes(".com")) {
        return {
          status: 400,
          message: "please enter valid email, must contain '@' and '.com'",
        }
      }

      //if req.body is valid then function will attempt to generate user awaiting the creatUser function from userDAO
      try {
        let unique_key = uuidv4()
        let data = await userDAO.createUser({
          username,
          age,
          email,
          password,
          user_id: unique_key,
        })

        console.log("Created new user:", data)
        return { status: 201, message: "User created successfully", user: data }
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
    return {
      status: 500,
      message: "Failed to check if username exists",
    }
  }
}

module.exports = { register }
