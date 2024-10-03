const dao = require("../repositories/vibeCheckDAO");
const uuid = require('uuid');

async function createVibeCheck(user_id, track_id, review, rating) {
    //check valid user_id from request
    if(user_id){
        //check if review is not empty and rating is 1-5
        if(review.trim() == ''){
            throw new Error("Review can't be empty");
        }
        if(rating < 0 || rating >= 6){
            throw new Error("Rating has to be 1-5");
        }
        const vibe_check_id = uuid.v4();
        const timestamp = Date.now();
        const vibeCheck = {vibe_check_id, user_id, track_id, review, rating, likes: 0, dislikes: 0, timestamp};
        return dao.addItem(vibeCheck);
    }else{
        throw new Error('No user_id was passed, might have to refresh session')
    }
}

async function getVibeCheckById(vibe_check_id){

}

async function getAllVibeChecks(user_id) {
    if(user_id){
        return dao.getAllItems();
    }else{
        throw new Error('No user_id was passed, might have to refresh session')
    }
}

async function deleteVibeCheck(user_id, vibe_check_id){
    if(user_id){
        if(vibe_check_id.trim() == ''){
            throw new Error("vibe_check_id can't be empty");
        }
        return dao.deleteItem(vibe_check_id);
    }else{
        throw new Error('No user_id was passed, might have to refresh session')
    }
}

async function likeOrDislike(user_id, vibe_check_id, type) {
    if(user_id){
        if(vibe_check_id.trim() == ''){
            throw new Error("vibe_check_id can't be empty");
        }
        if(type !== 'like' && type !== 'dislike' ){
            throw new Error("type must be like or dislike");
        }
        if(type.trim() == "like"){
            return dao.updateItemLikes(vibe_check_id);
        }
        if(type.trim() == "dislike"){
            return dao.updateItemDislikes(vibe_check_id);
        }
    }else{
        throw new Error('No user_id was passed, might have to refresh session')
    }
}

module.exports = {createVibeCheck, getVibeCheckById, getAllVibeChecks, deleteVibeCheck, likeOrDislike};