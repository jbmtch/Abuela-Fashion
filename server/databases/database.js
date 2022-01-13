
var pgp = require('pg-promise')();
const { options } = require('./dbconfig.js');

const db = pgp(options);

console.log('it worked');







