// MODULES
const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cp = require('child_process');
require('my-prototypes').init();

// CONFIGS
const config = require('./config');
const routes = require('./routes');

// CLASS
const Process = require('./class/Process.class');
const Game = require('./class/Game.class');

// INIT
const Dispatcher = require('./core/dispatcher');

let processList = [];
let gamesList = [];

function searchProcess(process){
    return process.process.pid === this.pid;
}

function searchGame(games){
    return games.name === this.name;
}

app.use(bodyParser.json({
    type: 'application/json'
}));

app.use(function (req, res, next) {
    new Dispatcher(req, res)
});

io.on('connection', function(socket){
    console.log('new connection');
});

http.listen(config.app.port, config.app.host, function () {
    console.log('Server listening on ' + config.app.port)
});