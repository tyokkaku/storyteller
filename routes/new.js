const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); 

/* GET users listing. */
router.post('/', function(req, res, next) {
  res.setHeader('Content-Type', 'text/plain');
  res.send(req.body.toString());
  console.log(req.body);
});


module.exports = router;
