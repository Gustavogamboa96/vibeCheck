const express = require("express")
const router = express.Router()

// controller layer functions
const { updateProfile } = require("../controllers/updateProfileController");
const { deleteAccount } = require("../controllers/deleteAccountController");

// middleware
const { dataValidation } = require("../middleware/updateProfileDataValidation");
const authenticateToken = require("../middleware/authenticateToken");
const { validateUser } = require("../middleware/validateUserOwnershipById");


// route to update profile, expects body with info, protected route
router.patch("/:userId", authenticateToken, validateUser, dataValidation, updateProfile);
router.delete("/:userId", authenticateToken, validateUser, deleteAccount)



module.exports = router
