class UserTable{
    constructor(database){
        this.database = database;
        this.database.exec("CREATE TABLE IF NOT EXISTS User  (userId INTEGER PRIMARY KEY AUTOINCREMENT, userUsername TEXT NOT NULL, userPassword TEXT NOT NULL, UNIQUE(userUsername))");
    }

    add(username, password){
        let statement = this.database.prepare("INSERT OR IGNORE INTO User(userUsername, userPassword) VALUES(?,?)");
        return statement.run(username, password);
    }

    read(){
        let statement = this.database.prepare("SELECT * FROM User");
        return statement.all();
    }

    getUserId(username){
        let statement = this.database.prepare("SELECT userId FROM User WHERE userUsername =?");
        let query =  statement.all(username);
        return query[0].userId;
    }

     identification(username, password){
        let statement =this.database.prepare("SELECT userId FROM User WHERE userUsername =? AND userPassword =?");
        let query = statement.all(username,password);
        return query.length > 0;
    }
}

export default UserTable;