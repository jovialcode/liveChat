const socketIo = require('socket.io');
const socketIoRedis = require('socket.io-redis');
const cluster = require('cluster');

const Logger = require('../util/logger');
const CONFIG = require('../config/config');
const {saveChat} = require('../repository/chatRepo');
const Chat = require('../model/chat');

module.exports = (server) => {
    const io = socketIo(server, {
        path : '/socket.io'
    });

    // Adapting Redis
    io.adapter(socketIoRedis({
            host: CONFIG.DEV.REDIS.URL,
            port: CONFIG.DEV.REDIS.PORT
        })
    );

    //사용자 socket 연결
    io.on('connection', function(socket){

        //사용자 입장
        console.log('user connected: ', socket.id);
        const name = "user";

        socket.to(socket.id).emit('change name',name);

        //사용자 퇴장
        socket.on('disconnect', function(){
            console.log('user disconnected: ', socket.id);
        });

        // 사용자에게 메시지 보내
        socket.on('send message', function(name, text){
            const message = name + ' : ' + text;
            Logger.info(name, message);
            io.emit('receive message', message);

            //메세지 DB에 저장하기
            saveChat(new Chat({
                roomId: '123',
                userName: name,
                message: message})
            );
        });
    });
}
