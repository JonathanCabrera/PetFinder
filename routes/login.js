var express = require('express');
var mysql = require('mysql');
var router = express.Router();

router.get('/', async function(req, res) {
  if(!req.body.id || !req.body.password){
     res.status("400");
     res.send("Invalid details!");
  } else
    res.render('home', {});
});



// USER
// console.log(req)



///
