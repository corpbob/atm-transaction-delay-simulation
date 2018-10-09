child_process = require('child_process');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //var fortune = child_process.execSync('fortune');
  //res.send(fortune.toString() + '\n');
   console.log("Simulating ATM transaction");
   setTimeout(function() {
    console.log('sleeping 30 secs');
    res.send('Transaction Done!\n');

   }, 3000);
});

module.exports = router;
