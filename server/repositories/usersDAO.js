const { documentClient } = require("../db/dynamoClient")
const { UpdateCommand, QueryCommand } = require("@aws-sdk/lib-dynamodb")

async function updateProfile() {
}

async function findUserById(userId) {
    /**
     * repository layer function to access db to query user by their id
     * 
     * userId - required string
     */

    try {

        // params for the query function
        const params = {
            TableName: "users_table",
            IndexName: "user_id-index",
            KeyConditionExpression: "#user_id = :userId",
            ExpressionAttributeNames: {
                "#user_id": "user_id"
            },
            ExpressionAttributeValues: {
                ":userId": userId
            }
        }

        return await documentClient.send(new QueryCommand(params));

    } catch (error) {
        throw new Error(error.message)
    }


}

module.exports = { updateProfile, findUserById }