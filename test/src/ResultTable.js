class ResultTable{
    constructor(database){
        this.database = database;
        this.database.exec("CREATE TABLE IF NOT EXISTS Result  (resultId INTEGER PRIMARY KEY AUTOINCREMENT, resultTimeInSeconds REAL NOT NULL, resultNbDeaths INTEGER NOT NULL," +
            "resultScoreValue INTEGER NOT NULL, result_LevelId INTEGER, result_UserId INTEGER)");
    }

    add(timeInSeconds, nbDeaths, scoreValue, levelId,userId){
        let statement = this.database.prepare("INSERT INTO Result(resultTimeInSeconds,resultNbDeaths, resultScoreValue, result_LevelId, result_UserId) VALUES(?,?,?,?,?)");
           statement.run(timeInSeconds,nbDeaths,scoreValue,levelId,userId);
        }

    read(){
        let statement = this.database.prepare("SELECT * FROM Result");
        return statement.all();
    }

    getResultsFromUsernamameAndLevel(username, levelname) {
        let statement = this.database.prepare("SELECT * FROM Result WHERE result_userId = ? AND result_LevelId = ?");
        return statement.all(userId,levelId);
    }

    getResultsFromUsername(username) {
        let statement = this.database.prepare("SELECT * FROM Result WHERE result_userId = ? AND result_LevelId = ?");
        return statement.all(userId,levelId);
    }

    getResultsFromLevelName(levelname) {
        let statement = this.database.prepare("SELECT * FROM Result WHERE result_LevelId = ?");
        return statement.all(levelId);
    }
}

export default  ResultTable;