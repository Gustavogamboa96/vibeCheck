const { documentClient } = require("../db/dynamoClient");
const {
    GetCommand,
    PutCommand,
    UpdateCommand,
    DeleteCommand,
    ScanCommand,
    QueryCommand} = require("@aws-sdk/lib-dynamodb");

const TableName = "vibe_checks_table";

async function addItem(vibeCheck){
    const command = new PutCommand({
        TableName,
        Item: vibeCheck,
        ReturnValues: "ALL_OLD"
    });
    try {
        const data = await documentClient.send(command);
        return data;
    } catch (err) {
        console.error(err);
        throw err; 
    }

}

async function getAllItems(){
    const command  = new ScanCommand({
        TableName
    })
    try {
        const data = await documentClient.send(command);
        return data;
    } catch (err) {
        console.error(err);
        throw err; 
    }
}

async function deleteItem(vibe_check_id) {
    const command = new DeleteCommand({
        TableName,  
        Key: {
            vibe_check_id: vibe_check_id  
        },
        ReturnValues: "ALL_OLD"
    });
    try {
        const data = await documentClient.send(command);
        // console.log("Deleted item:", data.Attributes);
        return data;
    } catch (error) {
        console.error("Error deleting item from DynamoDB:", error);
        throw new Error(error.message);
    }
}

async function updateItemLikes(vibe_check_id, value){
    const command = new UpdateCommand({
        TableName,
        Key: { vibe_check_id: vibe_check_id }, // Replace with your primary key
        UpdateExpression: "SET likes = if_not_exists(likes, :start) + :incr",// Increment by 1
        ExpressionAttributeValues: {
            ":incr": value,
            ":start": 0, // Start from 0 if dislikes doesn't exist
        },
        ReturnValues: "UPDATED_NEW", // Optional: to get the updated item
    });

    try {
        const data = await documentClient.send(command);
        return data;
    }catch(error){
        console.error(error);
        throw error; 
    }
}

async function addItemLikedBy(user_id, vibe_check_id){
    const command = new UpdateCommand({
        TableName,
        Key: { vibe_check_id: vibe_check_id }, // Replace with your primary key
        UpdateExpression: "SET liked_by = list_append(if_not_exists(liked_by, :empty_list), :user_id)",// Increment by 1
        ExpressionAttributeValues: {
            ":user_id": user_id,
            ':empty_list': { L: [] },
        },
        ReturnValues: "UPDATED_NEW", // Optional: to get the updated item
    });

    try {
        const data = await documentClient.send(command);
        return data;
    }catch(error){
        console.error(error);
        throw error; 
    }
}

async function removeItemLikedBy(newArray, vibe_check_id){
    const command = new UpdateCommand({
        TableName,
        Key: { vibe_check_id: vibe_check_id }, // Replace with your primary key
        UpdateExpression: "SET liked_by = :newarray",// remove user who liked
        ExpressionAttributeValues: {
            ":newarray": newArray,
        },
        ReturnValues: "UPDATED_NEW", // Optional: to get the updated item
    });

    try {
        const data = await documentClient.send(command);
        return data;
    }catch(error){
        console.error(error);
        throw error; 
    }
}


async function updateItemDislikes(vibe_check_id, value){
    const command = new UpdateCommand({
        TableName,
        Key: { vibe_check_id: vibe_check_id }, // Replace with your primary key
        UpdateExpression: "SET dislikes = if_not_exists(dislikes, :start) + :incr", // Increment by 1
        ExpressionAttributeValues: {
            ":incr": value,
            ":start": 0, // Start from 0 if dislikes doesn't exist
        },
        ReturnValues: "UPDATED_NEW", // Optional: to get the updated item
    });

    try {
        const data = await documentClient.send(command);
        return data;
    }catch(error){
        console.error(error);
        throw error; 
    }
}

async function addItemDislikedBy(user_id, vibe_check_id){
    const command = new UpdateCommand({
        TableName,
        Key: { vibe_check_id: vibe_check_id }, // Replace with your primary key
        UpdateExpression: "SET disliked_by = list_append(if_not_exists(disliked_by, :empty_list), :user_id)",// Increment by 1
        ExpressionAttributeValues: {
            ":user_id": user_id,
            ':empty_list': { L: [] },
        },
        ReturnValues: "UPDATED_NEW", // Optional: to get the updated item
    });

    try {
        const data = await documentClient.send(command);
        return data;
    }catch(error){
        console.error(error);
        throw error; 
    }
}

async function removeItemDislikedBy(newArray, vibe_check_id){
    const command = new UpdateCommand({
        TableName,
        Key: { vibe_check_id: vibe_check_id }, // Replace with your primary key
        UpdateExpression: "SET disliked_by = :newarray",// remove user who liked
        ExpressionAttributeValues: {
            ":newarray": newArray,
        },
        ReturnValues: "UPDATED_NEW", // Optional: to get the updated item
    });

    try {
        const data = await documentClient.send(command);
        return data;
    }catch(error){
        console.error(error);
        throw error; 
    }
}


//getItemById
async function getItemById(vibe_check_id) {
    const command = new GetCommand({
        TableName,
        Key: {
            "vibe_check_id": vibe_check_id
            }
    });

    try {
        const data = await documentClient.send(command);
        return data;
    } catch (err) {
        console.error("Error querying items:", err);
        throw err;
    }
}



module.exports = {getItemById,
                 getAllItems,
                 addItem, 
                 deleteItem, 
                 updateItemLikes, 
                 updateItemDislikes, 
                 addItemLikedBy, 
                 removeItemLikedBy, 
                 addItemDislikedBy, 
                 removeItemDislikedBy};