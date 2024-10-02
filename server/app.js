const express = require('express');
const vibeCheckRouter = require('./controller/vibeCheckRouter');
const accounts = require("./routes/accountsRoute");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.use("/vibe-checks", vibeCheckRouter);
app.use("/accounts", accounts);

app.listen(PORT, () => {
  console.log(`Server is running on port which is ${PORT}`);
});
