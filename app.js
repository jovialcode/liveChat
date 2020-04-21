const express = require('express');
const path = require('path');
const fs = require('fs');
const os = require('os');
const http = require('http');
const bodyParser = require('body-parser');
const sticky = require('sticky-session');
const cluster = require('cluster');
const net = require('net');
const farmhash = require('farmhash');

const CONFIG = require('./config/config');
const MESSAGE = require('./config/message');
const chat = require('./service/chatService');

const PORT = process.env.PORT || CONFIG.DEV.PORT;
const NUM_PROCESSES = os.cpus().length;

//ROUTE 설정
const viewRouter = require('./route/viewRouter');
const chatApiRouter = require('./route/api/chatApiRouter');

if (cluster.isMaster) {
    let workers = [];

    const spawn = function(i) {
        workers[i] = cluster.fork();

        workers[i].on('exit', function(code, signal) {
            console.log('respawning worker', i);
            spawn(i);
        });
    };

    for (let i = 0; i < NUM_PROCESSES; i++) {
        spawn(i);
    }

    const worker_index = function(ip, len) {
        return farmhash.fingerprint32(ip) % len;
    };

     const server = net.createServer({ pauseOnConnect: true },
        function(connection) {
        const worker = workers[worker_index(connection.remoteAddress, NUM_PROCESSES)];
        worker.send('sticky-session:connection', connection);
    }).listen(PORT);
} else {
    const app = new express();

    //APP 설정
    app.set('views', './view');
    app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile);

    app.use('/', viewRouter);
    app.use('/api/chats', chatApiRouter);

    //bodyParser 미들웨어 설정
    app.use(bodyParser.json());

    // 디렉토리 맵핑 설정
    app.use(express.static(path.join(__dirname, '/public')));

    // TODO 노드 배포 환경에 따라서 서버 생성 달리 할지 고민중
    if(process.env.NODE_ENV === 'production') {} else {}

    //서버 생성
    const server = app.listen(0, 'localhost')
    chat(server);

    process.on('message', function(message, connection) {
        if (message !== 'sticky-session:connection') {
            return;
        }

        // Emulate a connection event on the server by emitting the
        // event with the connection the master sent us.
        server.emit('connection', connection);

        connection.resume();
    });
}
