const express = require('express');
const accounts = require("./routes/accountsRoute");
const registerRouter = require("./controllers/registrationController")
const { loginController } = require("./controllers/loginController");
const PORT = process.env.PORT || 3000;

const app = express()

// middleware functions
const { loginBodyValidation } = require("./middleware/loginBodyValidation");

// middleware
app.use(express.json());
app.use("/accounts", accounts);

// route to handle the log in
app.post("/login", loginBodyValidation, loginController);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
