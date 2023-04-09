var pg = require('pg');

var conString = "postgres://sgtwducb:8n_z9boDg4fyH_43thF2yv6h--PJuYsG@snuffleupagus.db.elephantsql.com/sgtwducb" 
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