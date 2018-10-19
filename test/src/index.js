import express from "express";
import bodyparser from "body-parser";
import Database from "./database";


let app = express();
app.use(bodyparser.json());

let database = new Database();
/* GET home page. */
app.get('/', function(req, res) {
  res.send(database.read());
});

app.post('/user', function (req,res) {
   database.userTable.add(req.body.username, req.body.password);
   res.send(database.userTable.read());
});

app.post('/level', function (req,res) {
    database.levelTable.add(req.body.levelName);
    res.send(database.levelTable.read());
});

app.post('/result', function (req,res) {
    if(identification(req.body.username, req.body.password)){
        let userId = database.userTable.getUserId(req.body.username);
        database.resultTable.add(req.body.timeInSeconds,req.body.nbDeaths,req.body.scoreValue,req.body.levelId, userId);
        res.send(database.resultTable.read());
    }
});

app.post('/resultFromUserIdAndLevelId', function (req,res) {
    database.resultTable.getResultFromNameAndLevel(req.body.userId,req.body.levelId);
    res.send(database.resultTable.read());
});

app.post('/',function (req,res) {
    database.add(req.body.score);
    res.send(database.read());
});

function identification(username, password){
    return database.userTable.identification(username,password);
}

app.listen(3330);

