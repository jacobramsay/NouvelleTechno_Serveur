import bettersqlite3 from "better-sqlite3";

class Database{
constructor(){
    this.database = new bettersqlite3("database.db");
    this.database.exec("CREATE TABLE IF NOT EXISTS Score  (id INTEGER PRIMARY KEY AUTOINCREMENT, score INTEGER)");
}

read()
{
    let statement = this.database.prepare("SELECT * FROM Score");

    return statement.all();
}

add(score)
{
    let statement = this.database.prepare("INSERT INTO Score(score) VALUES(?)");
    statement.run(score);
}

}

export default Database;