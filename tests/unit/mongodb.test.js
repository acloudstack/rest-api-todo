//const {MongoClient} = require("mongodb");
const { connect } = require("../../mongodb/mongodb.connect");

let timeout = 20000;

describe("mongodb", () => {
    let connection;

    beforeAll(async (done) => {
        connection = await connect();
        done();
    }, timeout);

    afterAll(async (done) => {
        await connection.close();
        done();
    });

    it("should have a successful connection", (done) => {
        expect(connection).toBeDefined();
        expect(connection).not.toBeNull();
        done();
    });

    /*it("should throw error", async (done) => {
        try{
            await connect("abc");
        }catch(e){
            expect(e).toBeDefined();
            expect(e).not.toBeNull();
            done();
        }
    });*/
});