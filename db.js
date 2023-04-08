var pg = require('pg');

var conString = "postgres://doyyfffe:clQCO0U_Qbw1peLlkEric-30uHEPk9IK@snuffleupagus.db.elephantsql.com/doyyfffe" 
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