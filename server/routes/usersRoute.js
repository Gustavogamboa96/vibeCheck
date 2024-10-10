const express = require("express")
const router = express.Router()

// controller layer functions
const { updateProfile } = require("../controllers/updateProfileController");
const { deleteAccount } = require("../controllers/deleteAccountController");
const { sendFreindRequest } = require("../controllers/sendFriendRequestController");
const { updateFriendRequest } = require("../controllers/updateFriendRequestController");

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
// route to handle the accepting/denying friend request, expects either accept/deny in the body
router.patch("/:userId/friends", authenticateToken, validateUser, updateFriendRequest);



module.exports = router
