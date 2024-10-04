const { documentClient } = require("../db/dynamoClient")
const { UpdateCommand, QueryCommand } = require("@aws-sdk/lib-dynamodb")

async function updateProfile(userId, dataToUpdate, dataToDelete) {
    /**
     * function to udpate userdata
     */

    let updateSettings = {}

    // dynamically creating string for setting new values
    Object.entries(dataToUpdate).forEach(([key, value]) => {

        console.log(key);
        console.log(value);
    })

    // dynamically creating UpdateExpression
    Object.entries(dataToDelete).forEach(([key, value]) => {
        console.log(key);
        console.log(value);
    })

    // // params for db function call
    // const params = {
    //     TableName: users_table,
    //     Key: {
    //         user_id: userId
    //     },
    //     UpdateExpression: "SET #city = :city, #state= :state",
    //     ExpressionAttributeNames: {

    //     },
    //     ExpressionAttributeValues: {

    //     },
    //     ReturnValues: "ALL_NEW",
    // }

    // // db funciton call
    // return await documentClient.send(new UpdateCommand(params));

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

        // db function call
        return await documentClient.send(new QueryCommand(params));

    } catch (error) {
        throw new Error(error.message)
    }


}

module.exports = { updateProfile, findUserById }