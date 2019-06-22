const request = require("supertest");
const server = require("../server")();
const connection = require("../db/connection");
const Villes = require("../db/Villes");

describe("static routes", () => {
  it("display a msg for /test", () => {
    return request(server)
      .get("/test")
      .expect(200)
      .expect("test path working");
  });
});

describe("get Paris data", () => {
  afterAll(() => {
    connection.close();
  });

  it("returns Paris data when asked", () => {
    request(server)
      .get("/paris")
      .expect(200);
  });
});
