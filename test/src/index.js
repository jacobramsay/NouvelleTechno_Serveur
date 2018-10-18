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

app.post('/',function (req,res) {
    database.add(req.body.score);
    res.send(database.read());
});

app.listen(8080);

