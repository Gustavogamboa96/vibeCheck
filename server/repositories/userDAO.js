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

async function updateProfile(username, dataToUpdate, dataToDelete) {
  /**
   * function to udpate data for given user by their id
   * 
   * userId - required data
   * dataToUpdate - only present if the user changes something
   * dataToDelete - will 
   */

  // object to hold the settings that will be put into the update params
  let updateSettings = {}
  updateSettings.ExpressionAttributeNames = {}
  updateSettings.ExpressionAttributeValues = {}
  updateSettings.removeString = "";
  updateSettings.setString = "";

  // block checks if there are any items that need to be udpated
  if (Object.keys(dataToUpdate).length > 0) {
    // creating a new set strin 
    let setString = "SET ";

    // iterating through the object to create the string
    Object.entries(dataToUpdate).forEach(([key, value]) => {
      setString += `#${key} = :${key}, `;
      updateSettings.ExpressionAttributeNames[`#${key}`] = `${key}`;
      updateSettings.ExpressionAttributeValues[`:${key}`] = value;
    })

    // removing the trailing comma
    setString = setString.slice(0, setString.length - 2);

    updateSettings.setString = setString;

  }

  // block checks if there are attributes to be deleted
  if (Object.keys(dataToDelete).length > 0) {
    // creating the removing string
    let removeString = "REMOVE ";

    // iterating through the object to create the string
    Object.entries(dataToDelete).forEach(([key, value]) => {
      removeString += `#${key}, `;
      updateSettings.ExpressionAttributeNames[`#${key}`] = `${key}`;
    })

    // removing the trailing comma
    removeString = removeString.slice(0, removeString.length - 2);

    updateSettings.removeString = removeString;

  }

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
    ExpressionAttributeValues: {
      ...updateSettings.ExpressionAttributeValues
    },
    ReturnValues: "ALL_NEW",
  }

  console.log(params);
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
