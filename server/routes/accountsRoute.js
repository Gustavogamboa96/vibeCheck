const express = require("express");
const router = express.Router();

// service layer functions
const { loginController } = require("../controllers/loginController");
const { updateProfile } = require("../controllers/updateProfileController")

// middleware functions
const { loginBodyValidation } = require("../middleware/loginBodyValidation");

// route to handle the log in
router.post("/login", loginBodyValidation, loginController);

// route to handle the updating of user info for the profile (not password), protected route
router.patch("/users/:id", updateProfile);


module.exports = router;