class Dispatcher {

    constructor(req, res) {
        require('my-prototypes').init();
        this.pluralize = require('pluralize');

        this.routes = require('../routes');

        this.init(req, res);
    }

    init(req, res){
        let url = req.url;
        let urlParts = url.split('/');
        urlParts.shift();

        let controllerName;

        if(urlParts[0] === ''){
            controllerName = this.routes['/'].capitalize() + 'Controller';
        } else {
            if(urlParts[0] in this.routes){
                controllerName = this.routes[urlParts[0]].capitalize() + 'Controller';
            } else {
                controllerName = urlParts[0].capitalize() + 'Controller';
            }
        }


        try {
            let Controller = require('../controllers/' + controllerName);
            let controller = new Controller(req, res);

            let action = urlParts.length > 1 ? urlParts[1] : null;
            action = req.method.toLowerCase() + (action !== null ? action.capitalize() : '');

            let params;

            if(typeof controller[action] !== 'function'){
                params = urlParts.slice(1);
                action = req.method.toLowerCase();
            } else {
                params = urlParts.slice(2);
                if(params.length === 0 && req.method === 'GET'){
                    action = 'c' + req.method.toLowerCase();
                } else {
                    action = req.method.toLowerCase();
                }
            }

            console.log(params.length);
            console.log(action + '->' + params);

            controller[action].apply(controller, params);
        } catch (e) {
            res.sendStatus(404);
        }

    }
}

module.exports = Dispatcher;