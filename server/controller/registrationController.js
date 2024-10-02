const express = require("express")
const registerRouter = express.Router()
const { addUser } = require("../service/registrationService")

registerRouter.post("/", async (req, res) => {
  const { username, age, email, password } = req.body

  if (!username || !email || !password || !age) {
    return res
      .status(400)
      .json({ message: "username, age, email, and password are required" })
  }

  if (username.length < 7 || username.length == 0) {
    return res
      .status(400)
      .json({ message: "username must be atleast 7 characters" })
  } else if (username.length > 25) {
    return res
      .status(400)
      .json({ message: "username must be no longer than 25 characters" })
  }

  if (password.length < 7 || password.length == 0) {
    return res
      .status(400)
      .json({ message: "password must be atleast 7 characters" })
  } else if (username.length > 20) {
    return res
      .status(400)
      .json({ message: "password must be no longer than 20 characters" })
  }

  if (!email.includes("@") || !email.includes(".com")) {
    return res.status(400).json({
      message: "please enter valid email, must contain '@' and '.com'",
    })
  }

  try {
    const newUser = await addUser(username, age, email, password)

    if (newUser.success) {
      return res
        .status(201)
        .json({ message: "User created successfully", user: newUser.user })
    } else {
      return res
        .status(500)
        .json({ message: "Failed to create user", error: newUser.error })
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to create user", error })
  }
})

module.exports = registerRouter
