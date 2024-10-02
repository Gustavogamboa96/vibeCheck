const express = require("express");
const router = express.Router();

// layers
const { loginController } = require("../controller/loginController");

// middleware
const { loginBodyValidation } = require("../middleware/loginBodyValidation");

router.post("/login", loginBodyValidation, loginController);


module.exports = router;