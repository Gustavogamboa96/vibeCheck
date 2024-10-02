const express = require("express")
const registerRouter = express.Router()
const registrationController = require("../service/registrationService")

registerRouter.post("/", async (req, res) => {
  const { username, age, email, password } = req.body

  const result = await registrationController.register(
    username,
    age,
    email,
    password
  )

  return res
    .status(result.status)
    .json({ message: result.message, user: result.user })
})

module.exports = registerRouter
