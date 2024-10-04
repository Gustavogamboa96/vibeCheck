const userDAO = require("../repositories/userDAO")
const { register } = require("../services/registrationService")
const { dataResponse } = require("../utils/dataResponse")
const bcrypt = require("bcrypt")

jest.mock("../repositories/userDAO")
jest.mock("bcrypt")

describe("registrationService", () => {
  test("Should return message 'Username already taken' if username is already taken", async () => {
    const expectedResponse = { message: "Username already taken", status: 401 }

    userDAO.getUserByUsername.mockResolvedValue({
      Items: [{ username: "username", password: "password" }],
      Count: 1,
    })

    const response = await register(
      "username",
      21,
      "email@gmail.com",
      "password"
    )

    expect(response).toEqual(expectedResponse)
  })

  test("Should return message 'User created successfully' if user was created successfully", async () => {
    const expectedResponse = {
      message: "User created successfully",
      status: 201,
    }

    userDAO.getUserByUsername.mockResolvedValue({ Items: [], Count: 0 })

    const response = await register(
      "username",
      21,
      "email@gmail.com",
      "password"
    )

    expect(response).toEqual(expectedResponse)
  })

  test("Should return message 'Username must be at least 7 characters' if username is less that 7 characters", async () => {
    const expectedResponse = {
      message: "Username must be at least 7 characters",
      status: 400,
    }

    userDAO.getUserByUsername.mockResolvedValue({ Items: [], Count: 0 })

    const response = await register("user", 21, "email@gmail.com", "password")

    expect(response).toEqual(expectedResponse)
  })
})
