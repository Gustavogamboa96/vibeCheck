const express = require("express")
const router = express.Router()

// controller layer functions
const { updateProfile } = require("../controllers/updateProfileController");

// middleware
const { dataValidation } = require("../middleware/updateProfileDataValidation");
const authenticateToken = require("../middleware/authenticateToken");
const { checkReturnedUser } = require("../middleware/returnedUserByIdCheck");


// route to update profile, expects body with info, protected route
router.patch("/:userId", authenticateToken, checkReturnedUser, dataValidation, updateProfile);



module.exports = router
