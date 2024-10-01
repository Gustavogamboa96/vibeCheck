const express = require("express");
const router = express.Router();
const VibeCheckService = require("../service/vibeCheckService");
const authenticateToken = require('../middleware/authenticateToken');

router.post("/", authenticateToken, async (req, res) => {
    const user_id = 123456;
    // const user_id = req.user.user_id;
    const {track_id, review, rating} = req.body;
    
    try{
        await VibeCheckService.createVibeCheck(user_id, track_id, review, rating);
        res.status(201).json({ message: `VibeCheck created succesfully: `, track_id, review, rating});
      } catch(error) {
        res.status(401).json({ message: error.message });
      }

})

router.get("/", authenticateToken, async (req, res) => {
    const user_id = 123456;
    // const user_id = req.user.user_id;
    try{
        const data = await VibeCheckService.getVibeChecks(user_id);
        res.status(200).json({message: "All available vibeChecks", data});
    }catch(error){
        res.status(401).json({message: error.message})
    }

})

router.delete("/:id", authenticateToken, async (req, res) => {
    const user_id = 123456;
    // const user_id = req.user.user_id;
    const vibe_check_id = req.params.id;

    try{
        const data = await VibeCheckService.deleteVibeCheck(user_id, vibe_check_id);
        res.status(200).json({message: `VibeCheck ${vibe_check_id} was deleted`, data});
    }catch(error){
        res.status(401).json({message: error.message})
    }

})

module.exports = router;