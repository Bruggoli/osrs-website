var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

/* POST for handling rsn lookup */
router.post('/search', async function(req, res, next) {
  try {

  } catch (e) {
    console.error("POST error:" + e);
  }
})
