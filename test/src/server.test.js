import chai,{expect} from "chai";
import chaiHttp from "chai-http";
import Server from "./server";

chai.use(chaiHttp);

let request = chai.request;
let currentServer = null;

beforeEach(() =>{
    currentServer = new Server();
});

afterEach(() =>{
    currentServer.database.drop();
    currentServer = null;
});

describe("Database is empty",() => {
    it("Database is empty",(done) => {
        request(currentServer)
            .get("/")
            .end(function (error,response) {
                expect(error).to.be.null;
                expect(response).to.have.status(200);
                expect(response.body).to.be.empty;
                done();
            });
    });
});

describe("Basic retrieve result test",() => {
    it("Basic retrieve result test",(done) => {
        currentServer.database.resultTable.add(5,2,521,1,1);
        request(currentServer)
            .get("/")
            .end(function (error,response) {
                expect(error).to.be.null;
                expect(response).to.have.status(200);
                expect(response.body).to.not.be.empty;
                done();
            });
    });
});

describe("Result retrieve from level name test",() => {
    it("Result retrieve from level name test",(done) => {
        currentServer.database.levelTable.add("Test level");
        currentServer.database.userTable.add("Nicolas","123");
        currentServer.database.resultTable.add(5,2,521,1,1);
        request(currentServer)
            .post("/resultFromLevelName")
            .send({levelName: 'Test level'})
            .end(function (error,response) {
                expect(error).to.be.null;
                expect(response).to.have.status(200);
                expect(response.body).resultTimeInSeconds = 5;
                expect(response.body).resultNbDeaths = 2;
                expect(response.body).resultScoreValue = 521;
                expect(response.body).userUsername = "Nicolas";
                expect(response.body).levelName = "Test level";
                done();
            });
    });
});

describe("Result retrieve from username test",() => {
    it("Result retrieve from username test",(done) => {
        currentServer.database.levelTable.add("Test level");
        currentServer.database.userTable.add("Nicolas","123");
        currentServer.database.resultTable.add(5,2,521,1,1);
        request(currentServer)
            .post("/resultFromUserName")
            .send({username: 'Nicolas'})
            .end(function (error,response) {
                expect(error).to.be.null;
                expect(response).to.have.status(200);
                expect(response.body).resultTimeInSeconds = 5;
                expect(response.body).resultNbDeaths = 2;
                expect(response.body).resultScoreValue = 521;
                expect(response.body).userUsername = "Nicolas";
                expect(response.body).levelName = "Test level";
                done();
            });
    });
});

describe("User post test",() => {
    it("User post test",(done) => {
        request(currentServer)
            .post("/user")
            .send({username: 'Nicolas',password:"123"})
            .end(function (error,response) {
                expect(error).to.be.null;
                expect(response).to.have.status(200);
                expect(response.body.changes).to.equal(1);
                expect(currentServer.identification("Nicolas","123")).to.be.true;
                expect(currentServer.identification("Nicolas","214")).to.be.false;
                done();
            });
    });
});

describe("Level post test",() => {
    it("Level post test",(done) => {
        request(currentServer)
            .post("/level")
            .send({levelName: 'Post malone'})
            .end(function (error,response) {
                expect(error).to.be.null;
                expect(response).to.have.status(200);
                expect(response.body.changes).to.equal(1);
                done();
            });
    });
});

describe("Result post test",() => {
    it("Result post test",(done) => {
        currentServer.database.levelTable.add("Test level");
        currentServer.database.userTable.add("Jacob","123");
        request(currentServer)
            .post("/result")
            .send({"timeInSeconds" : 1234567890, "nbDeaths" : 1234567890, "scoreValue" : 10, "levelId" : 1, "username" :"Jacob", "password":"123"})
            .end(function (error,response) {
                expect(error).to.be.null;
                expect(response).to.have.status(200);
                expect(response.body.changes).to.equal(1);
                done();
            });
    });
});

describe("Result post with invalid username test",() => {
    it("Result post with invalid username test",(done) => {
        currentServer.database.levelTable.add("Test level");
        currentServer.database.userTable.add("Jacob","123");
        request(currentServer)
            .post("/result")
            .send({"timeInSeconds" : 1234567890, "nbDeaths" : 1234567890, "scoreValue" : 10, "levelId" : 1, "username" :"Salocin", "password":"123"})
            .end(function (error,response) {
                expect(error).to.be.null;
                expect(response).to.have.status(200);
                expect(response.body.error).to.equal("Invalid username or password");
                done();
            });
    });
});




