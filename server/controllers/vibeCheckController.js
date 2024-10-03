const express = require("express");
const router = express.Router();
const VibeCheckService = require("../services/vibeCheckService");


//post
async function createVibeCheckController(req, res){
    const user_id = 123456;
    // const user_id = req.user.user_id;
    const {track_id, review, rating} = req.body;
    
    try{
        await VibeCheckService.createVibeCheck(user_id, track_id, review, rating);
        res.status(201).json({ message: `VibeCheck created succesfully: `, track_id, review, rating});
      } catch(error) {
        res.status(401).json({ message: error.message });
      }

}

//get
async function getAllVibeChecksController(req, res) {
    const user_id = 123456;
    // const user_id = req.user.user_id;
    try{
        const data = await VibeCheckService.getAllVibeChecks(user_id);
        res.status(200).json({message: "All available vibeChecks", data});
    }catch(error){
        res.status(401).json({message: error.message})
    }

}

//
async function deleteVibeCheckController(req, res){
    const user_id = 123456;
    // const user_id = req.user.user_id;
    const vibe_check_id = req.params.id;

    try{
        const data = await VibeCheckService.deleteVibeCheck(user_id, vibe_check_id);
        res.status(200).json({message: `VibeCheck ${vibe_check_id} was deleted`, data});
    }catch(error){
        res.status(401).json({message: error.message})
    }

};

async function likeOrDislikeController(req, res){
    const user_id = 123456;
    // const user_id = req.user.user_id;
    const vibe_check_id = req.params.id;
    const type = req.params.likeordislike; 

    try{
        await VibeCheckService.likeOrDislike(user_id, vibe_check_id, type);
        res.status(200).json({message: `Vibecheck ${type} recorded`})
    }catch(error){
        res.status(401).json({message: error.message});
    }

};

module.exports = {createVibeCheckController, 
                  getAllVibeChecksController, 
                  deleteVibeCheckController,
                  likeOrDislikeController}



