const { documentClient } = require("../db/dynamoClient");
const {
    QueryCommand,
    PutCommand,
    UpdateCommand,
    DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");

const USERS_TABLE = "users_relationship_table"

async function sendFriendReuest(userId, targetUserId) {
    /**
     * DAO layer function to handle the sending of a friend request
     * 
     * by default the friendship status will be pending
     */
    try {
        const params = {
            TableName: USERS_TABLE,
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

// accepting friend
// getting friend List
// deleting (deny, delete friend) friend

// query by your id
// list of all the targetUserId
// filter by block first
// filter friendstatus = [pending, accepted, ]

module.exports = { sendFriendReuest };