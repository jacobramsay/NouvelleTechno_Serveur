import bettersqlite3 from "better-sqlite3";
import UserTable from "./UserTable";
import LevelTable from "./LevelTable";
import ResultTable from "./ResultTable";

class Database{
    constructor(){
        this.database = new bettersqlite3("database.db");

        this.userTable = new UserTable(this.database);
        this.levelTable = new LevelTable(this.database);
        this.resultTable = new ResultTable(this.database);

    }

    drop(){
        let statement = this.database.prepare("DROP TABLE Result");
        statement.run();
        statement =  this.database.prepare("DROP TABLE User");
        statement.run();
        statement =  this.database.prepare("DROP TABLE Level");
        statement.run();

    }
}

export default Database;