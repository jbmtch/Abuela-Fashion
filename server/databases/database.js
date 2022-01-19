
var pgp = require('pg-promise')();
const { options } = require('./dbconfig.js');
const db = pgp(options);
const _ = require('underscore');

var getAllReviews = function(callback, productId = 564305, page = 1, count = 5) {
  var queryString = 'SELECT reviews.*, COALESCE(json_agg(photos.*) FILTER (WHERE photos.review_id IS NOT NULL), \'[]\') AS photos FROM public."reviews" LEFT JOIN public."photos" ON reviews.id = photos.review_id where product_id = $1 GROUP BY reviews.id ORDER BY reviews.helpfulness DESC limit $2';
  // var queryString = 'select json_build_object(characteristics.name, json_build_object(\'value\', avg(CAST(characteristics_reviews.value as numeric)))) as characteristics from characteristics_reviews left join characteristics on characteristics.id = characteristics_reviews.characteristic_id where characteristics.product_id = 564305 group by characteristics.name';
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

var getMetaData = function(callback, productId = 564305) {
  // var queryString = 'select reviews.rating, reviews.recommend, characteristics.name, characteristics_reviews.value from reviews left join characteristics_reviews on characteristics_reviews.review_id = reviews.id left join characteristics on characteristics.id = characteristics_reviews.characteristic_id limit 25;'
  var characteristicsQuery = 'select json_build_object(characteristics.name, json_build_object(\'value\', avg(CAST(characteristics_reviews.value as numeric)))) as characteristics from characteristics_reviews left join characteristics on characteristics.id = characteristics_reviews.characteristic_id where characteristics.product_id = $1 group by characteristics.name';
  var charParams = [productId];
  db.query(characteristicsQuery, charParams)
  .then((results) => {
    var obj = {};
    var characteristics = results[0]['characteristics'];
    obj['characteristics'] = characteristics;
    results.forEach((char, index) => {
      if (index !== 0) {
        _.extend(obj['characteristics'], char['characteristics']);
        console.log(obj);
      }
    });
    return obj;
  })
  .then((obj) => {
    var ratingsQuery = 'select json_build_object(\'1\', (select count(*) as one_count from reviews where product_id = $1 and reviews.rating = 1), \'2\', (select count(*) as two_count from reviews where product_id = $1 and reviews.rating = 2), \'3\', (select count(*) as three_count from reviews where product_id = $1 and reviews.rating = 3), \'4\', (select count(*) as four_count from reviews where product_id = $1 and reviews.rating = 4), \'5\', (select count(*) as five_count from reviews where product_id = $1 and reviews.rating = 5)) as ratings from reviews where product_id = $1';
    var params = [productId];
    db.query(ratingsQuery, params)
    .then((results) => {
      console.log(results);
      _.extend(obj, results[0]);
      return obj;
    })
    .then((obj) => {
      var recString = 'select json_build_object(\'true\', (select count(*) as true from reviews where product_id = $1 and reviews.recommend = true), \'false\', (select count(*) as false from reviews where product_id = $1 and reviews.recommend = false)) as recommended from reviews where product_id = $1';
      var params = [productId];
      db.query(recString, params)
      .then((results) => {
        _.extend(obj, results[0]);
        obj['product_id'] = productId;
        callback(null, obj);
      })
      .catch((err) => {
        callback(err, null);
      })
    })
    .catch((err) => {
      callback(err, null);
    })

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






