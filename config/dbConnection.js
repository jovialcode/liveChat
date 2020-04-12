const  mongoose  = require("mongoose");
const CONFIG = require('config/config');

mongoose.Promise  = require("bluebird");

const  url  =  `mongodb://${CONFIG.DEV.DB.URL}:${CONFIG.DEV.DB.PORT}/${CONFIG.DEV.DB.SCHEME}`;

const  connect  =  mongoose.connect(url, { useNewUrlParser: true  });
module.exports  =  connect;