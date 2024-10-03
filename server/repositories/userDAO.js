const { documentClient } = require("../db/dynamoClient");
const { QueryCommand } = require("@aws-sdk/lib-dynamodb");

async function getUserByUsername(username) {
    /**
     * repository layer function to handle the querying of a user by username
     * username - string
     */

    try {
        // params for the querying condition
        const params = {
            TableName: "users_table",
            KeyConditionExpression: "#username = :username",
            ExpressionAttributeNames: {
                "#username": "username"
            },
            ExpressionAttributeValues: {
                ":username": username
            }
        }

        return await documentClient.send(new QueryCommand(params));
    } catch (error) {
        throw new Error(error.message);
    }
}



module.exports = { getUserByUsername };