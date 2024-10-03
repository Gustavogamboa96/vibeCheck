const { dataResponse } = require("../utils/dataResponse");
const dao = require("../repositories/vibeCheckDAO");
const uuid = require('uuid');

async function createVibeCheck(user_id, track_id, review, rating) {
    try{
        const data = {};
        //check valid user_id from request
        if(user_id){
            //check if review is not empty and rating is 1-5
            if(review.trim() == ''){
                data.message = "Review can't be empty";
                return dataResponse(401, "fail", data);
            }
            if(rating < 0 || rating >= 6){
                data.message = "Rating has to be 1-5";
                return dataResponse(401, "fail", data);
            }
            //comeback to this when get by id ready
            const vibe_check_id = uuid.v4();
            const timestamp = Date.now();
            const vibeCheck = {vibe_check_id, user_id, track_id, review, rating, likes: 0, dislikes: 0, timestamp};
            const createdVibeCheck = await dao.addItem(vibeCheck);
            const newlyCreatedVibeCheck = await getVibeCheckById(user_id, vibe_check_id); 
            
            if(!newlyCreatedVibeCheck.Item){
                data.message = "New VibeCheck couldn't be retrieve possibly not created";
                return dataResponse(401, "fail", data);
            }
            data.newlyCreatedVibeCheck = createdVibeCheck.Item;
            return dataResponse(200, "success", data);

        }else{
            data.message = 'No user_id was passed, might have to refresh session';
            return dataResponse(401, "fail", data);
        }
    }catch(error){
        throw new Error(error.message);
    }
}

async function getVibeCheckById(user_id, vibe_check_id){
    try{
        const data = {};
        if(user_id){
            if(vibe_check_id.trim() == ''){
                data.message = "vibe_check_id can't be empty";
                return dataResponse(401, "fail", data);
            }
            const returnedVibeCheck = await getVibeCheckById(vibe_check_id);
            if(!returnedVibeCheck.Item){
                data.message = "Couldn't get vibeCheck";
                return dataResponse(401, "fail", data);
            }
            data.returnedVibeCheck = returnedVibeCheck.Item;
            return dataResponse(200, "success", data);
        }else{
            data.message = 'No user_id was passed, might have to refresh session';
            return dataResponse(401, "fail", data);
        }
    }catch(error){
        throw new Error(error.message);
    }

}

async function getAllVibeChecks(user_id) {
    try{
        const data = {};
        if(user_id){
            const returnedVibeChecks = await dao.getAllItems()
            if (returnedVibeChecks.Count === 0 || returnedVibeChecks.Items.length === 0) {
                data.message = "VibeChecks couldn't be retrieved";
                return dataResponse(401, "fail", data);
            }
            data.returnedVibeChecks = returnedVibeChecks.Items;
            return dataResponse(200, "success", data);
        }else{
            data.message = 'No user_id was passed, might have to refresh session';
            return dataResponse(401, "fail", data);
        }
    }catch(error){
        throw new Error(error.message);
    }
}

async function deleteVibeCheck(user_id, vibe_check_id){
    try{
        const data = {};
        if(user_id){
            if(vibe_check_id.trim() == ''){
                data.message = "vibe_check_id can't be empty";
                return dataResponse(401, "fail", data);
            }
            const deletedItem = await dao.deleteItem(vibe_check_id);
            if(!deletedItem.Attributes){
                data.message = "Vibecheck wasn't deleted";
                return dataResponse(401, "fail", data);
            }
            data.deletedVibeCheck = deletedItem.Attributes;
            return dataResponse(200, "success", data);
        }else{
            data.message = 'No user_id was passed, might have to refresh session';
            return dataResponse(401, "fail", data);
        }
    }catch(error){
        throw new Error(error.message);
    }
}

async function likeOrDislike(user_id, vibe_check_id, type) {
    try{
        const data ={};
        if(user_id){
            //checks
            if(vibe_check_id.trim() == ''){
                data.message = "vibe_check_id can't be empty";
                return dataResponse(401, "fail", data);
            }
            if(type !== 'like' && type !== 'dislike' ){
                data.message = "type must be like or dislike";
                return dataResponse(401, "fail", data);
            }
            //for likes
            if(type.trim() == "like"){
                const updatedVibeCheck =  await dao.updateItemLikes(vibe_check_id);
                if(!updatedVibeCheck.Attributes){
                    data.message = "like didn't go through";
                    return dataResponse(401, "fail", data);
                }
                data.updatedVibeCheck = updatedVibeCheck.Attributes;
                return dataResponse(200, "success", data)
            }
            //for dislikes
            if(type.trim() == "dislike"){
                const updatedVibeCheck =  await dao.updateItemDislikes(vibe_check_id);
                if(!updatedVibeCheck.Attributes){
                    data.message = "dislike didn't go through";
                    return dataResponse(401, "fail", data);
                }
                data.updatedVibeCheck = updatedVibeCheck.Attributes;
                return dataResponse(200, "success", data)
            }
        }else{
            data.message = 'No user_id was passed, might have to refresh session';
            return dataResponse(401, "fail", data);
        }
    }catch(error){
        throw new Error(error.message);
    }
}

module.exports = {createVibeCheck, getVibeCheckById, getAllVibeChecks, deleteVibeCheck, likeOrDislike};