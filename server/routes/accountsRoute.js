const express = require("express")
const router = express.Router()

// layers
const { loginController } = require("../controller/loginController")
const {
  registrationController,
} = require("../controller/registrationController")

// middleware
const { loginBodyValidation } = require("../middleware/loginBodyValidation")
const {
  registrationBodyValidation,
} = require("../middleware/registrationBodyValidation")

router.post("/login", loginBodyValidation, loginController)
router.post("/register", registrationBodyValidation, registrationController)

module.exports = router
