class LevelTable{
    constructor(database){
        this.database = database;
        this.database.exec("CREATE TABLE IF NOT EXISTS Level  (levelId INTEGER PRIMARY KEY AUTOINCREMENT, levelName TEXT NOT NULL, UNIQUE(levelName))");
    }

    add(levelName){
        let statement = this.database.prepare("INSERT OR IGNORE INTO Level(levelName) VALUES(?)");
        return statement.run(levelName);
    }
}

export default LevelTable;