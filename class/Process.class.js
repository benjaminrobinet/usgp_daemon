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

module.exports = Process;