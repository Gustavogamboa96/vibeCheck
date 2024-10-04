const express = require('express');
const accounts = require("./routes/usersRoute");
const authentication = require("./routes/authenticationRoute");
const PORT = process.env.PORT || 3000;

const app = express()

// middleware
app.use(express.json());
app.use("", authentication)
app.use("/users", accounts);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
