const express = require("express")
const router = express.Router()

// controller layer functions
const { updateProfile } = require("../controllers/updateProfileController");

const {
  registrationController,
} = require("../controller/registrationController")

// middleware
const {
  registrationBodyValidation,
} = require("../middleware/registrationBodyValidation")

// route to handle the updating of user info for the profile (not password), protected route
router.patch("/users/:userId", updateProfile);

router.post("/register", registrationBodyValidation, registrationController)

module.exports = router
