const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());


app.listen(PORT, () => {
  console.log(`Server is running on port which is ${PORT}`);
});
