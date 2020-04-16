const express = require('express');
const path = require('path');
const fs = require('fs');
const os = require('os');
const http = require('http');
const bodyParser = require('body-parser');
const sticky = require('sticky-session');

const CONFIG = require('./config/config');
const MESSAGE = require('./config/message');
const chat = require('./service/chatService');

const PORT = process.env.PORT || CONFIG.DEV.PORT;
const app = express();

//APP 설정
app.set('views', './view');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//로그 설정
const logger = require('./util/logger');

//ROUTE 설정
const viewRouter = require('./route/viewRouter');
const chatApiRouter = require('./route/api/chatApiRouter');

app.use('/', viewRouter);
app.use('/api/chats', chatApiRouter);

//bodyParser 미들웨어 설정
app.use(bodyParser.json());

// 디렉토리 맵핑 설정
app.use(express.static(path.join(__dirname, '/public')));

// TODO 노드 배포 환경에 따라서 서버 생성 달리 할지 고민중
if(process.env.NODE_ENV === 'production') {
    //logger.info(MESSAGE.PRODUCTION_SERVER_CONNECT);
} else {
    //logger.info(MESSAGE.DEV_SERVER_CONNECT);
}

//서버 생성
const server = http.createServer(app).listen(PORT, () => {
    logger.info(MESSAGE.DEV_SERVER_CONNECT);
});

//workers를 사용하기 때문에 sticky session 설정
sticky.listen(server,3000);

//채팅 socket.io 설정
chat(server);
