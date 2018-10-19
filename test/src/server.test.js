import chai,{expect} from "chai";
import chaiHttp from "chai-http";
import Server from "./server";
import fs from "fs";

chai.use(chaiHttp);

let request = chai.request;
let currentServer = null;

beforeEach(() =>{
    if(fs.existsSync("database.db")){
        fs.unlinkSync("database.db");
    }
    currentServer = new Server();
});

afterEach(() =>{
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
        request(currentServer)
            .get("/")
            .end(function (error,response) {
                expect(error).to.be.null;
                expect(response).to.have.status(200);
               // currentServer.database.resultTable.add(5,2,521,1,1);
                expect(response.body).to.be.empty;
                done();
            });
    });
});
