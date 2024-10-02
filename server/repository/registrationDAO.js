const { documentClient } = require("../db/dynamoClient")
const { PutCommand } = require("@aws-sdk/lib-dynamodb")

async function createUser(user) {
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

module.exports = { createUser }
