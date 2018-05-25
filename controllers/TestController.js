class TestController {

    constructor(req, res){
        this.req = req;
        this.res = res;
    }

    get(){
        this.res.send('GET all');
    }

    getFrancais(){
        return this.res.send('GET Français');
    }

}

module.exports = TestController;