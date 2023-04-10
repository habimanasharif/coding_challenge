var pg = require('pg');

var conString = "postgres://emwvkwgj:MdJxaDtePjMO1H2ymlp3vSI4GejklBlh@hattie.db.elephantsql.com/emwvkwgj" 
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