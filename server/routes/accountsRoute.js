const express = require("express")
const router = express.Router()

// controller layer functions
const { updateProfile } = require("../controllers/updateProfileController");

// route to handle the updating of user info for the profile (not password), protected route
router.patch("/users/:userId", updateProfile);



module.exports = router
