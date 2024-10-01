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
        Item: vibeCheck
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
        return data.Items;
    } catch (err) {
        console.error(err);
        throw err; 
    }
}

async function deleteItem(vibeCheckId) {
    const command = new DeleteCommand({
        TableName,  
        Key: {
            vibe_check_id: vibeCheckId  
        },
        ReturnValues: "ALL_OLD"
    });
    try {
        const data = await documentClient.send(command);
        // console.log("Deleted item:", data.Attributes);
        return data.Attributes ? data.Attributes : { message: "Item deleted successfully" };
    } catch (error) {
        console.error("Error deleting item from DynamoDB:", error);
        throw new Error(error.message);
    }
}

module.exports = {getAllItems, addItem, deleteItem};