const express = require('express');
const mysql = require('mysql');
const fetch = require("node-fetch");
const https = require('https');
const axios = require('axios').default;
//const querystring = require('querystring');
//const fs = require('fs');

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));


//--------------------------------------------------API post info--------------------------------------------------

getApiAuth();

var tokenType = "";
var expiresIn = 0;
var accessToken = "";

async function getApiAuth(){

  

  axios
    .post('https://api.petfinder.com/v2/oauth2/token', {
      grant_type: "client_credentials",
      client_id: "xGuOIWMLc2BR0zFXcMSdMoLPe5dko8hdHm7ncHJqmcVuBA7iHx",
      client_secret: "1ix8XcU6Ih4GLPwJCRWrVAKCJ2Fu68pyFIbLctvR"
    })
    .then((res) => {
      console.log(`statusCode: ${res.status}`)
      //console.log(res.data)

      tokenType = res.data.token_type;
      expiresIn = res.data.expires_in;
      accessToken = res.data.access_token;

      //console.log(`token type: ${tokenType}\nexpires in: ${expiresIn}\naccess token: ${accessToken}`);

      //getAnimals();

    })
    .catch((error) => {
      console.error(error)
    })

}



async function getAnimals() {

  axios
    .get('https://api.petfinder.com/v2/animals?type=dog', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(function (res) {
      console.log(res.data.animals[0]);
    })
    .catch(function (error) {
      console.log(error);
    }) 
}



//--------------------------------------------------Routes--------------------------------------------------

//home route
app.get('/', function(req, res) {
  let dogs = [];

  getApiAuth();

  axios
    .get('https://api.petfinder.com/v2/animals?type=dog', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(function (response) {
      dogs = [response.data.animals[0], response.data.animals[1], response.data.animals[2]];
      res.render('home', {
        "dogs": dogs
      });
    })
    .catch(function (error) {
      console.log(error);
    })

});

//var loginRouter = require('./routes/login');

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

//adoption route
app.get("/adoption", function(req, res) {
  res.render('adoption');
});

//--------------------------------------------------SQL database and server start functions--------------------------------------------------

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
