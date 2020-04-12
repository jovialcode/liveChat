const SocketIo = require('socket.io');
const {saveChat} = require('../repository/chat');
const Chat = require('../model/chat');
const Logger = require('../util/logger');

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
