const request = require("supertest");
const server = require("../server")();

describe("static routes", () => {
  it("display a msg for /test", () => {
    return request(server)
      .get("/test")
      .expect(200)
      .expect("test path working");
  });
});
