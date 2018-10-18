class UserTable{
    constructor(database){
        this.database = database;
        this.database.exec("CREATE TABLE IF NOT EXISTS User  (userId INTEGER PRIMARY KEY AUTOINCREMENT, userUsername TEXT NOT NULL, userPassword TEXT NOT NULL, UNIQUE(userUsername))");
    }

    add(username, password){
        let statement = this.database.prepare("INSERT OR IGNORE INTO User(userUsername, userPassword) VALUES(?,?)");
        statement.run(username, password);
    }

    read(){
        let statement = this.database.prepare("SELECT * FROM User");
        return statement.all();
    }
    getUserExists(username){

    }
}

export default UserTable;