const express = require('express');
const app = express();
const port = 5555;
const db = require('./database.js');



app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})