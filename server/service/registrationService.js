const { createUser } = require("../repository/registrationDAO")
const { v4: uuidv4 } = require("uuid")

async function addUser(username, age, email, password) {
  let unique_key = uuidv4()
  let data = await createUser({
    username,
    age,
    email,
    password,
    user_id: unique_key,
  })
  console.log("Created new user:", data)
  return data
}

module.exports = { addUser }
