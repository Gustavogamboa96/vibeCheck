const { documentClient } = require("../db/dynamoClient")
const { QueryCommand, PutCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb")

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
        "#username": "username",
      },
      ExpressionAttributeValues: {
        ":username": username,
      },
    }

    return await documentClient.send(new QueryCommand(params))
  } catch (error) {
    throw new Error(error.message)
  }
}

async function createUser(user) {
  /**
   * repository layer function to handle creating a new user
   */

  const command = new PutCommand({
    TableName: "users_table",
    Item: user,
  })

  try {
    await documentClient.send(command)
    return { success: true, user }
  } catch (err) {
    console.error("Failed to create user:", err)
    return { success: false, error: err }
  }
}

async function updateProfile(username, updateSettings) {
  /**
   * function to udpate data for given user by their id
   * 
   * userId - required data
   * dataToUpdate - only present if the user changes something
   * dataToDelete - will 
   */

  // // params for db function call
  const params = {
    TableName: "users_table",
    Key: {
      username: username
    },
    UpdateExpression: updateSettings.setString + " " + updateSettings.removeString,
    ExpressionAttributeNames: {
      ...updateSettings.ExpressionAttributeNames
    },
    ReturnValues: "ALL_NEW",
  }

  // conditionally added the ExpressionAttributeValues if they are present
  if (Object.keys(updateSettings.ExpressionAttributeValues).length !== 0) {
    params.ExpressionAttributeValues = { ...updateSettings.ExpressionAttributeValues };
  }

  // // db funciton call
  return await documentClient.send(new UpdateCommand(params));

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

module.exports = { getUserByUsername, createUser, updateProfile, findUserById }
