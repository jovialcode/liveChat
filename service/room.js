const connect = require('../repository/dbConnection');

exports.getRooms = (req, res, next) =>{
    res.setHeader("Content-Type", "application/json");
    res.statusCode  =  200;

    connect.then(db  =>  {
        Chats.find({})
            .then(chat  =>  {
                res.json(chat);
            })
    });
}