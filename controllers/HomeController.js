const Controller = require('./Controller');

class HomeController extends Controller{

    constructor(req, res){
        super(req,res);
    }

    get(){
        this.res.send('GET all');
    }

}

module.exports = HomeController;