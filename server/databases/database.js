
var pgp = require('pg-promise')();
const { options } = require('./dbconfig.js');
const db = pgp(options);

var getAllReviews = function(callback, productId = 2, page = 1, count = 5) {
  var queryString = 'SELECT reviews.*, json_agg(photos.*) AS photos FROM public."photos" LEFT JOIN public."reviews" ON reviews.id = photos.review_id GROUP BY reviews.id limit $2'
  let total = page * count;
  // var queryString = 'SELECT * FROM reviews WHERE product_id = $1 limit $2';
  var params = [productId, total]
  db.query(queryString , params)
  .then((results) => {
    console.log(results);
    callback(null, results);
  })
  .catch((error) => {
    callback(error, null);
  })
}



console.log('Successfully connected to postgres db: ', options.database);


module.exports = {
  getReviews: getAllReviews,

}






