const mongoose  = require("mongoose");
const Logger = require('../util/logger');
const CONFIG = require('../config/config');

mongoose.Promise = require("bluebird");

const url = `mongodb://${CONFIG.DEV.DB.URL}:${CONFIG.DEV.DB.PORT}/${CONFIG.DEV.DB.SCHEME}`;
Logger.info(`MongoDB connect 경로 : ${url}`);

const connect = mongoose.connect(url, { useNewUrlParser: true  }, (err)=>{
    if(err){
        Logger.info('MongoDB 연결 실패', err);
        return;
    }
    Logger.debug('MongoDB에 연결되었습니다.');
});
module.exports = connect;