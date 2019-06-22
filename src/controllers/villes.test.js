const request = require("supertest");
const server = require("../app")();
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
  beforeAll(async () => {
    await Villes.deleteMany({});
    await Villes.insertMany({ name: "Paris" });
  });
  afterAll(() => {
    connection.close();
  });

  it("returns Paris data when asked", () => {
    return request(server)
      .get("/paris")
      .expect(200)
      .then(res => {
        const { name } = res.body[0];
        expect(name).toBe("Paris");
      });
  });

  it("doesnt crach if no ressource when asked", () => {
    return request(server)
      .get("/parisss")
      .expect(404);
  });

  it("drop the db when asked", () => {
    return request(server)
      .post("/drop")
      .expect(200);
  });
});

describe("post ville", () => {
  afterAll(() => {
    connection.close();
  });

  it("can add some ville", () => {
    return request(server)
      .post("/paris")
      .expect(200);
  });
});
