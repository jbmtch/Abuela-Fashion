
var pgp = require('pg-promise')();
const { options } = require('./dbconfig.js');
const db = pgp(options);

var getAllReviews = function(callback, productId = 5, page = 2, count = 5) {
  // var queryString = 'SELECT reviews.*, json_agg(photos.*) AS photos FROM public."reviews" LEFT JOIN public."photos" ON reviews.id = photos.review_id GROUP BY reviews.id limit $2';
  var queryString = 'SELECT reviews.*, COALESCE(json_agg(photos.*) FILTER (WHERE photos.review_id IS NOT NULL), \'[]\') AS photos FROM public."reviews" LEFT JOIN public."photos" ON reviews.id = photos.review_id where product_id = $1 GROUP BY reviews.id limit $2';
  let total = page * count;
  var params = [productId, total]
  db.query(queryString , params)
  .then((results) => {
    results.forEach((review) => {
      var date = new Date(Number(review.date));
      review['date'] = date;
    })
    var obj = {};
    obj['product'] = productId;
    obj['page'] = page;
    obj['count'] = count;
    obj['results'] = results;
    callback(null, obj);
  })
  .catch((error) => {
    callback(error, null);
  })
}

var getMetaData = function(callback, productId = 5) {
  var queryString = 'select reviews.rating, reviews.recommend, characteristics.name, characteristics_reviews.value from reviews left join characteristics_reviews on characteristics_reviews.review_id = reviews.id left join characteristics on characteristics.id = characteristics_reviews.characteristic_id limit 25;'
  db.query(queryString)
  .then((results) => {
    callback(null, results);
  })
  .catch((error) => {
    callback(error, null);
  })
}



console.log('Successfully connected to postgres db: ', options.database);


module.exports = {
  getReviews: getAllReviews,
  getMetaData: getMetaData

}






