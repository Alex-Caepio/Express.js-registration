import chai from "chai";
import chaiHttp from "chai-http";
import { expect } from "chai";
import { describe, it } from "mocha";

chai.use(chaiHttp);

//test if a user can sign up
describe("User test", () => {
  it("should create a new user", () => {
    chai
      .request("127.0.0.1:3010")
      .post("/api/users/post")
      .send({
        email: "alexxy5@mail.com",
        password: "123456",
        role: "admin",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("x-api-key", "admin")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
      });
  });
});
