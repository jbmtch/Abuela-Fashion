
var pgp = require('pg-promise')({
  schema: './schema.sql'
});
const { options } = require('./dbconfig.js');

const db = pgp(options);







