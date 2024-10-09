const { dataResponse } = require("../utils/dataResponse")

function registrationBodyValidation(req, res, next) {
  /**
   * middleware function to handle the checking of the body params
   *
   * username - required
   * age - required
   * email - required
   * password - required
   */

  // destructuring the body
  const { username, email, password } = req.body

  // block to handle any incorrect data
  if (
    !username ||
    !email ||
    !password ||
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    username.length < 7 ||
    username.length > 25 ||
    password.length < 7 ||
    password.length > 20 ||
    !email.includes("@") ||
    !email.includes(".com") ||
    username.includes("<") ||
    username.includes(">") ||
    username.includes("[") ||
    username.includes("]") ||
    username.includes("{") ||
    username.includes("}") ||
    username.includes("(") ||
    username.includes(")") ||
    username.includes("=") ||
    username.includes("|") ||
    username.includes(":") ||
    username.includes(";") ||
    username.includes(",") ||
    username.includes("+") ||
    username.includes("*") ||
    username.includes("?") ||
    username.includes("%") ||
    username.includes("&") ||
    username.includes(" ") ||
    password.includes("<") ||
    password.includes(">") ||
    password.includes("[") ||
    password.includes("]") ||
    password.includes("{") ||
    password.includes("}") ||
    password.includes("(") ||
    password.includes(")") ||
    password.includes("=") ||
    password.includes("|") ||
    password.includes(":") ||
    password.includes(";") ||
    password.includes(",") ||
    password.includes("+") ||
    password.includes("*") ||
    password.includes("?") ||
    password.includes("%") ||
    password.includes("&") ||
    password.includes(" ") ||
    email.includes("<") ||
    email.includes(">") ||
    email.includes("[") ||
    email.includes("]") ||
    email.includes("{") ||
    email.includes("}") ||
    email.includes("(") ||
    email.includes(")") ||
    email.includes("=") ||
    email.includes("|") ||
    email.includes(":") ||
    email.includes(";") ||
    email.includes(",") ||
    email.includes("+") ||
    email.includes("*") ||
    email.includes("?") ||
    email.includes("%") ||
    email.includes("&") ||
    email.includes(" ")
  ) {
    let data = {}

    // block if both username and passwords are missing
    if (!username && !password) {
      // constructing data
      data.message = "username and password are required"
    }
    // block for missing username
    else if (!username) {
      // constructing data
      data.message = "username is required"
    }
    // block for missing password
    else if (!password) {
      // constructing data
      data.message = "password is required"
    }
    // block for missing password
    else if (!email) {
      // constructing data
      data.message = "email is required"
    } else if (typeof username !== "string" && typeof password !== "string") {
      // constructing data
      data.message = "invalid username and password types"
    }
    // block checks that params are valid strings
    else if (typeof username !== "string") {
      // constructing data
      data.message = "invalid username type"
    }

    // block checks that params are valid strings
    else if (typeof password !== "string") {
      // constructing data
      data.message = "invalid password type"
    }

    // block checks that params are valid strings
    else if (typeof email !== "string") {
      // constructing data
      data.message = "invalid email type"
    }

    //checks if username is of valid length
    else if (username.length < 7) {
      // constructing data
      data.message = "username must be atleast 7 characters"
    }

    //checks if username is no longer than 25 characters
    else if (username.length > 25) {
      // constructing data
      data.message = "username must be no longer than 25 characters"
    }

    //checks if password is of valid length
    else if (password.length < 7) {
      // constructing data
      data.message = "password must be atleast 7 characters"
    }

    //checks if password is no longer than 20 characters
    else if (password.length > 20) {
      // constructing data
      data.message = "password must be no longer than 20 characters"
    }

    //checks if email is valid by including "@"
    else if (!email.includes("@")) {
      // constructing data
      data.message = "email url's must contain '@' character"
    }
    //checks if email is valid by including ".com"
    else if (!email.includes(".com")) {
      // constructing data
      data.message = "email url's must contain '.com'"
    } else if (
      username.includes("<") ||
      username.includes(">") ||
      username.includes("[") ||
      username.includes("]") ||
      username.includes("{") ||
      username.includes("}") ||
      username.includes("(") ||
      username.includes(")") ||
      username.includes("=") ||
      username.includes("|") ||
      username.includes(":") ||
      username.includes(";") ||
      username.includes(",") ||
      username.includes("+") ||
      username.includes("*") ||
      username.includes("?") ||
      username.includes("%") ||
      username.includes("&") ||
      username.includes(" ")
    ) {
      //constructing data
      data.message = "Illegal characters detected"
    } else if (
      password.includes("<") ||
      password.includes(">") ||
      password.includes("[") ||
      password.includes("]") ||
      password.includes("{") ||
      password.includes("}") ||
      password.includes("(") ||
      password.includes(")") ||
      password.includes("=") ||
      password.includes("|") ||
      password.includes(":") ||
      password.includes(";") ||
      password.includes(",") ||
      password.includes("+") ||
      password.includes("*") ||
      password.includes("?") ||
      password.includes("%") ||
      password.includes("&") ||
      password.includes(" ")
    ) {
      //constructing data
      data.message = "Illegal characters detected"
    } else if (
      email.includes("<") ||
      email.includes(">") ||
      email.includes("[") ||
      email.includes("]") ||
      email.includes("{") ||
      email.includes("}") ||
      email.includes("(") ||
      email.includes(")") ||
      email.includes("=") ||
      email.includes("|") ||
      email.includes(":") ||
      email.includes(";") ||
      email.includes(",") ||
      email.includes("+") ||
      email.includes("*") ||
      email.includes("?") ||
      email.includes("%") ||
      email.includes("&") ||
      email.includes(" ")
    ) {
      //constructing data
      data.message = "Illegal characters detected"
    }

    // constructing response
    response = dataResponse(400, "fail", data)

    // returning response
    return res.status(response.httpStatus).json({
      status: response.status,
      data,
    })
  }

  next()
}

module.exports = { registrationBodyValidation }
