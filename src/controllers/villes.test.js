const request = require("supertest");
const app = require("../app")();
const connection = require("../db/connection");
const Villes = require("../db/Villes");

describe("static routes", () => {
  it("display a msg for /test", () => {
    return request(app)
      .get("/test")
      .expect(200)
      .expect("test path working");
  });
});

describe("get Paris data", () => {
  beforeAll(async () => {
    await Villes.deleteMany({});
    await Villes.insertMany([{ name: "Paris" }, { name: "A" }]);
  });
  afterAll(() => {
    connection.close();
  });

  it("returns Paris data when asked", () => {
    return request(app)
      .get("/villes/Paris")
      .expect(200)
      .then(res => {
        const { name } = res.body[0];
        expect(name).toBe("Paris");
      });
  });

  it("doesnt explode", () => {
    return request(app)
      .get("/villes")
      .expect(200)
      .then(res => {
        const { body } = res;
        console.log(body);
      });
  });
});
