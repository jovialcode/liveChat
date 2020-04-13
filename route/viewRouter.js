const express = require('express');
const router = express.Router();

// index.html
router.get('/', function(req, res, next) {
  res.render('index');
});

//client.html 맵핑
router.get('/chat', (req, res, next) => {
  res.render('chat');
});

//admin.html 맵핑
router.get('/admin', (req, res, next) => {
  res.render('admin');
});

module.exports = router;