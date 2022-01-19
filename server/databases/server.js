require('newrelic');
const express = require('express');
//const cors = require('cors')
const app = express();
const port = 5555;
const db = require('./database.js');


// app.use(express.static('../client/dist'));
app.use(express.json());


app.get('/reviews/', function(req, res) {
  db.getReviews((err, results) => {
    if (err) {
      console.error(err);
    } else {
      res.send(results);
    }
  }, req.query.product_id);
})

app.get('/reviews/meta/', function(req, res) {
  db.getMetaData((err, results) => {
    if (err) {
      console.error(err);
    } else {
      res.send(results);
    }
  }, req.query.product_id)
})



app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})