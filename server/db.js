var pg = require('pg');
var dotenv = require('dotenv');
dotenv.config();

var conString = process.env.DB
var db = new pg.Client(conString);
db.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  db.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log("Database connected  successfully");
  });
});
module.exports= db;