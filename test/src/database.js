import bettersqlite3 from "better-sqlite3";
import UserTable from "./UserTable";
import LevelTable from "./LevelTable";
import ResultTable from "./ResultTable";

class Database{
    constructor(){
        this.database = new bettersqlite3("database.db");
        this.database.exec("CREATE TABLE IF NOT EXISTS Score  (id INTEGER PRIMARY KEY AUTOINCREMENT, score INTEGER)");

        this.userTable = new UserTable(this.database);
        this.levelTable = new LevelTable(this.database);
        this.resultTable = new ResultTable(this.database);

    }

    read() {
        let statement = this.database.prepare("SELECT * FROM Score");
        return statement.all();
    }

    add(score) {
        let statement = this.database.prepare("INSERT INTO Score(score) VALUES(?)");
        statement.run(score);
    }
}

export default Database;