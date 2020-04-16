const path = require('path');

module.exports = {
    apps : [{
        script    : path.join(__dirname, '/../app.js'),
        instances : 2,
        exec_mode : "cluster"
    }]
}