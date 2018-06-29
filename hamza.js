const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http').Server(app);

app.use(bodyParser.json({
    type: 'application/json'
}));

app.post('/', function(req, res){
    console.log(req);
});


http.listen(config.app.port, config.app.host, function () {
    console.log('Server listening on ' + config.app.port)
});