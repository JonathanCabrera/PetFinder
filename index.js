const express = require('express');
const app = express();
const mysql = require('mysql');
const fetch = require("node-fetch");
app.set("view engine", "ejs");
app.use(express.static("public"));

// const { Curl } = require('node-libcurl');

// const curl = new Curl();

// curl.setOpt('URL', 'www.google.com');
// curl.setOpt('FOLLOWLOCATION', true);

// curl.on('end', function (statusCode, data, headers) {
//   console.info(statusCode);
//   console.info('---');
//   console.info(data.length);
//   console.info('---');
//   console.info(this.getInfo( 'TOTAL_TIME'));
//   console.log(data);
  
//   this.close();
// });

// curl.on('error', curl.close.bind(curl));
// curl.perform();


//home route
app.get('/', function(req, res) {
  res.render('home');
});

//login route
app.get("/login", function(req, res) {
  res.render('login');
});

//register route
app.get("/register", function(req, res) {
  res.render('register');
});

//search route
app.get("/search", function(req, res) {
  res.render('results');
});



//use this function to retrieve data from the SQL database
async function executeSQL(sql, params) {

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

app.listen(3000, () => {
  console.log('server started');
});