import express from "express";
import bodyparser from "body-parser";
import Database from "./database";

class Server{
    constructor() {
        this.app = express();
        this.app.use(bodyparser.json());

        this.database = new Database();
        let self = this;

        self.app.get('/', function(req, res) {
            res.send(self.database.read());
        });

        self.app.post('/resultFromLevelName', function(req, res) {
            res.send(self.database.resultTable.getResultsFromLevelName(req.body.levelName));
        });

        self.app.post('/resultFromUserName', function(req, res) {
            res.send(self.database.resultTable.getResultsFromUsername(req.body.username));
        });

        self.app.post('/user', function (req,res) {
            self.database.userTable.add(req.body.username, req.body.password);
            res.send(self.database.userTable.read());
        });

        self.app.post('/level', function (req,res) {
            self.database.levelTable.add(req.body.levelName);
            res.send(self.database.levelTable.read());
        });

        self.app.post('/result', function (req,res) {
            if(identification(req.body.username, req.body.password)){
                let userId = self.database.userTable.getUserId(req.body.username);
                self.database.resultTable.add(req.body.timeInSeconds,req.body.nbDeaths,req.body.scoreValue,req.body.levelId, userId);
                res.send(self.database.resultTable.read());
            }
        });

        self.app.post('/',function (req,res) {
            self.database.add(req.body.score);
            res.send(self.database.read());
        });

        function identification(username, password){
            return self.database.userTable.identification(username,password);
        }
    }

    address(){
        return this.currentApp ? this.currentApp.address() : null;
    }

    listen(port){
        this.currentApp = this.app.listen(port);
        return this;
    }

    close(){
        if(this.currentApp){
            this.currentApp.close();
            this.currentApp = null;
        }
    }
}

export default Server;

