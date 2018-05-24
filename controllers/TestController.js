class TestController {

    constructor(req, res){
        this.req = req;
        this.res = res;
    }

    get(id,test){
        this.res.send('GET all');
        console.log(id + test);
    }

    getFrancais(){
        return this.res.send('GET Français');
    }

}

module.exports = TestController;