const express = require("express")
const router = express.Router()

// controller layer functions
const { updateProfile } = require("../controllers/updateProfileController");

// middleware
const { dataValidation } = require("../middleware/updateProfileDataValidation")

// route to update profile, expects body with info, protected route
router.patch("/:userId", dataValidation, updateProfile);



module.exports = router
