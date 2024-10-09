const express = require("express")
const router = express.Router()

// controller layer functions
const { updateProfile } = require("../controllers/updateProfileController");
const { deleteAccount } = require("../controllers/deleteAccountController");
const { sendFreindRequest } = require("../controllers/sendFriendRequestController");

// middleware
const { dataValidation } = require("../middleware/updateProfileDataValidation");
const authenticateToken = require("../middleware/authenticateToken");
const { validateUser } = require("../middleware/validateUserOwnershipById");


// route to update profile, expects body with info, protected route
router.patch("/:userId", authenticateToken, validateUser, dataValidation, updateProfile);
// route to delete user, expects the userId as a route param
router.delete("/:userId", authenticateToken, validateUser, deleteAccount);
// route to send a friend request, expects username of person in the body
router.post("/:userId/friends", authenticateToken, validateUser, sendFreindRequest);



module.exports = router
