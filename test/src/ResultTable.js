
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

    getResultsFromUsername(username) {
        let statement = this.database.prepare("SELECT Result.resultTimeInSeconds,Result.resultNbDeaths,Result.resultScoreValue,User.userUsername,Level.levelName FROM Result " +
            "INNER JOIN User ON Result.result_UserId = User.userId " +
            "INNER JOIN Level ON Result.result_LevelId = Level.levelId WHERE user.userUsername = ?");
        return statement.all(username);
    }

    getResultsFromLevelName(levelname) {
        let statement = this.database.prepare("SELECT Result.resultTimeInSeconds,Result.resultNbDeaths,Result.resultScoreValue,User.userUsername,Level.levelName FROM Result " +
            "INNER JOIN User ON Result.result_UserId = User.userId " +
            "INNER JOIN Level ON Result.result_LevelId = Level.levelId WHERE Level.levelName = ?");
        return statement.all(levelname);
    }
}

export default  ResultTable;