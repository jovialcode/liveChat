const SocketIo = require('socket.io');
const connect  = require("config/dbConnection");
const Logger = require('util/logger');

module.exports = (server) => {
    const io = SocketIo(server, {
        path : '/socket.io'
    });

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
        socket.on('send message', function(name,text){
            const msg = name + ' : ' + text;
            Logger.info(name, msg);
            socket.emit('receive message', msg);
        });
    });
}
