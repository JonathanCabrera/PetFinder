const express = require('express');
const mysql = require('mysql');
const fetch = require("node-fetch");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

//home route
app.get('/', function(req, res) {
  res.render('home');
});


//login route
app.get('/login', function(req, res) {
  res.render('login');
});

//search route
app.get("/search", function(req, res) {
  res.render('search');
});

//use this function to retrieve data from the SQL database
async function getData(sql, params) {
  return new Promise(function(resolve, reject) {
    let conn = dbConnection();
    conn.query(sql, params, function(err, rows, fields) {
      if (err) throw err;
      resolve(rows);
    });
  });
}

//database
function dbConnection() {

  const pool = mysql.createPool({

    connectionLimit: 1000,
    host: "wiad5ra41q8129zn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "qf7d0xcoxx04dr6v",
    password: "a0twz7veq2mv2s8a",
    database: "yto45t25jp313qtq"

  });

  return pool;

} //dbConnection

app.listen(process.env.PORT || 3300, function(){
    console.log('Server has been started');
})