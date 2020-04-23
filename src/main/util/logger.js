const winston = require('winston');
const process = require('process');
const path = require('path');

const { combine, timestamp, label, printf } = winston.format;
const appRoot = path.join(__dirname, '../../../');

// log 출력 포맷 정의
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const options = {
    // log파일
    file: {
        level: 'info',
        filename: `${appRoot}/log/server.log`, // 로그파일을 남길 경로
        handleExceptions: true,
        json: false,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
        format: combine(
            label({ label: 'chatServer' }),
            timestamp(),
            myFormat    // log 출력 포맷
        )
    },
    // 개발 시 console에 출력
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
        format: combine(
            label({ label: 'nba_express' }),
            timestamp(),
            myFormat
        )
    }
};

let logger = new winston.createLogger({
    transports: [
        new winston.transports.File(options.file) // 중요! 위에서 선언한 option으로 로그 파일 관리 모듈 transport
    ],
    exitOnError: false,
});

if(process.env.NODE_ENV !== 'production'){
    logger.add(new winston.transports.Console(options.console)) // 개발 시 console로도 출력
}

module.exports = logger;
