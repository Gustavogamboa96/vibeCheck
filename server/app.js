const express = require('express');
const accounts = require("./routes/accountsRoute");
const authentication = require("./routes/authenticationRoute");
const PORT = process.env.PORT || 3000;

const app = express()

// middleware
app.use(express.json());
app.use("", authentication)
app.use("/accounts", accounts);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
