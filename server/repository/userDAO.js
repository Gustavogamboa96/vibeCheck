const { documentClient } = require("../db/dynamoClient")
const { QueryCommand, PutCommand } = require("@aws-sdk/lib-dynamodb")

async function getUserByUsername(username) {
  /**
   * repository layer function to handle the querying of a user by username
   *
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

module.exports = { getUserByUsername, createUser }
