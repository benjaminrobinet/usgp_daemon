const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cp = require('child_process');

const config = require('./config.json');

let games = {
    "minecraft": {
        "command": "java -jar minecraft.jar"
    }
}

let processList = [];

class Process{
    constructor(game){
        this.game = game;
        this.process = this.spawnProcess(this.game);

    }

    spawnProcess(game){
        let process = cp.spawn('node', ['test.js']);
        return process;
    }
}

function searchProcess(process){
    return process.process.pid === this.pid;
}

app.use(bodyParser.json({
    type: 'application/json'
}));

app.get('/data/:id', function (req, res) {
    console.log('GET /data/' + req.params.id);
    if(processList[req.params.id]){
        console.log('yes it exists, do not launch the process');
    } else {
        for (let i=0; i<=5; i++) {
            let newProcess = new Process('minecraft', null);
            processList.push(newProcess);
        }
        console.log(processList);
        // console.log(processList.find(searchProcess, {pid: newProcess.pid}));
    }
    res.sendFile(__dirname + '/data.html');
});

io.on('connection', function(socket){
    console.log('new connection');
});

http.listen(config.app.port, config.app.host, function () {
    console.log('Server listening on ' + config.app.port)
});