const express = require("express");
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const vibeCheckController = require("../controller/vibeCheckController");


router.post("/", authenticateToken, vibeCheckController.createVibeCheckController)

router.get("/", authenticateToken, vibeCheckController.getAllVibeChecksController);

router.delete("/:id", authenticateToken, vibeCheckController.deleteVibeCheckController);

router.patch("/:id/:likeordislike", authenticateToken, vibeCheckController.likeOrDislikeController);

module.exports = router;