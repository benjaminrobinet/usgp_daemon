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


app.get('/', function (req, res) {
    console.log('GET ' + req.url);
    res.sendFile(__dirname + '/data.html');
});

/*
* Return all the running process
* */
app.get('/process', function (req, res) {
    console.log('GET ' + req.url);
    res.json(processList);
});

/*
* Create new process and return it
* Params:
*   :game => Name of the game
*   :version => Version of the game
* */
app.put('/process/:game/:version', function (req, res) {
    console.log('PUT ' + req.url);
    res.sendStatus(201);
    // res.send(games.indexOf(req.params.game).toString())
    // let newProcess = new Process('minecraft', null);
    // console.log(processList);

});

app.post('/process/:pid/:action', function (req, res) {
    console.log('POST ' + req.url);
    let _process;
    if(!processList.find(searchProcess, {pid: req.params.pid})){
        return res.sendStatus(404);
    }
    if(_process){
        switch (req.params.action){
            case 'kill':
                res.send('KILL ' + _process);
                break;
            default:
                res.sendStatus(400);
                break;
        }
    }
});

/*
* Add a game by a given body
* */
app.put('/games', function (req, res) {
    let _body = req.body;
    if(typeof _body.name !== 'string'){
        return res.sendStatus(400);
    }
    if(typeof _body.command !== 'string'){
        return res.sendStatus(400);
    }
    if(!Array.isArray(_body.versions)){
        return res.sendStatus(400);
    }


    if(gamesList.find(searchGame, {name: _body.name})){
        return res.sendStatus(405); // game already existing, not adding, should use POST to edit
    }

    let _newGame = new Game(_body.name, _body.command, _body.versions);
    gamesList.push(_newGame);

    res.sendStatus(201);
});

/*
* Return all games
* */
app.get('/games', function (req, res) {
    res.json(gamesList);
});

/*
* Return game by a given name
* */
app.get('/game/:name', function (req, res) {
    res.json(gamesList.find(searchGame, {name: req.params.name}));
});

app.post('/game/:name/edit', function (req, res) {
    let _body = req.body;
    if(typeof _body.name !== 'string'){
        return res.sendStatus(400);
    }
    if(!Array.isArray(_body.command)){
        if(_body.command.length === null){
            return res.sendStatus(400);
        }
    }
    if(!Array.isArray(_body.versions)){
        if(_body.versions.length === null){
            return res.sendStatus(400);
        }
    }

    let _gameToEdit = gamesList.find(searchGame, {name: req.params.name});
    if(_gameToEdit){
        _gameToEdit.name = _body.name;
        _gameToEdit.command = _body.command;
        _gameToEdit.versions = _body.versions;

        return res.json(_gameToEdit);
    } else {
        return res.sendStatus(404);
    }
});

io.on('connection', function(socket){
    console.log('new connection');
});

http.listen(config.app.port, config.app.host, function () {
    console.log('Server listening on ' + config.app.port)
});