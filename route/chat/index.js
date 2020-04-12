const express = require('express');
const router = express.Router();
const connect = require('../../repository/dbConnection');

//client.html 맵핑
router.get('/client', (req, res, next) => {
  res.render('chat/client');
});

router.get('/api/chats', (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode  =  200;
  connect.then(db  =>  {
    Chats.find({})
        .then(chat  =>  {
          res.json(chat);
        })
    });
});

module.exports = router;