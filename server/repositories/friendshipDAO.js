const { documentClient } = require("../db/dynamoClient");
const {
    QueryCommand,
    PutCommand,
    UpdateCommand,
    DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");

const TABLE_NAME = "users_relationship_table"

async function sendFriendReuest(userId, targetUserId) {
    /**
     * DAO layer function to handle the sending of a friend request
     * 
     * by default the friendship status will be pending
     */
    try {
        const params = {
            TableName: TABLE_NAME,
            Item: {
                userId: userId,
                targetUserId: targetUserId,
                friendStatus: "pending"
            }
        }

        return await documentClient.send(new PutCommand(params));
    } catch (error) {
        throw new Error(error.message)
    }
}

async function retrieveAllFriendsByStatus(userId, status) {
    /**
     * DAO layer function to retrieve all friends by the provided status
     */
    try {
        const params = {
            TableName: TABLE_NAME,
            IndexName: "userId-index",
            KeyConditionExpression: "#userId = :userId",
            FilterExpression: " #friendStatus = :status",
            ExpressionAttributeNames: {
                "#userId": "userId",
                "#friendStatus": "friendStatus"
            },
            ExpressionAttributeValues: {
                ":userId": userId,
                ":status": status
            }
        }

        return await documentClient.send(new QueryCommand(params));

    } catch (error) {
        throw new Error(error.message)
    }
}

// accepting friend
// getting friend List
// deleting (deny, delete friend) friend
// handle deleting friends if they delete their account

// query by your id
// list of all the targetUserId
// filter by block first
// filter friendstatus = [pending, accepted, ]

module.exports = { sendFriendReuest, retrieveAllFriendsByStatus };