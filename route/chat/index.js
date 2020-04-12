const express = require('express');
const router = express.Router();

router.get('/client', function(req, res, next) {
  res.render('chat/client');
});

module.exports = router;