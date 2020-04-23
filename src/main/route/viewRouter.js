const express = require('express');
const cluster = require('cluster');
const router = express.Router();

const Logger = require('../util/logger');

// index.html
router.get('/', function(req, res, next) {
  res.render('index');
});

//client.html 맵핑
router.get('/chat', (req, res, next) => {
  Logger.debug('worker: ' + cluster.worker.id);
  res.render('chat',{
    name: "박명언"
  });
});

//admin.html 맵핑
router.get('/admin', (req, res, next) => {
  res.render('admin');
});

module.exports = router;