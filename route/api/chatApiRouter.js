const express = require('express');
const router = express.Router();
const {getChat} = require('../../repository/chatRepo');

router.get('/api/chats', (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode  =  200;
    res.json(getChat())
});

module.exports = router;