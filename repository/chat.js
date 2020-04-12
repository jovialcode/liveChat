const connect  = require("../repository/dbConnection");
const Chat = require('../model/chat');
const Logger = require('../util/logger');

exports.saveChat = (chat) =>{
    //메세지 DB에 저장하기
    connect.then(db => {
        let chatMessage = chat;

        chatMessage.save(()=>{
            Logger.info('DB로 저장되었습니다.');
        });
    });
}