const express = require('express');
const accounts = require("./routes/accountsRoute");
const registerRouter = require("./controller/registrationController")
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use("/accounts", accounts);
app.use("/register", registerRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
