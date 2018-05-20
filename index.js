// IMPORTS
// MODULES
const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cp = require('child_process');
// const mongoose = require('mongoose');
// CONFIGS
const config = require('./config.json');
// CLASS
const Process = require('./class/Process.class.js');

// INIT
// mongoose.connect('mongodb://localhost/daemon');


let games = {
    "minecraft": {
        "command": "java -jar minecraft.jar"
    }
};

let processList = [];

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