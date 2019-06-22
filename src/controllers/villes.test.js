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
    await Villes.insertMany([
      {
        name: "Paris",
        hab: 2,
        social: { score: 5, votes: 2, comments: ["gg"] }
      },
      { name: "Reims", hab: 3, social: { score: 0, votes: 0, comments: [] } }
    ]);
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

  it("return error with wrong params", () => {
    return request(app)
      .get("/villes?sortBy=hhh")
      .expect(400);
  });

  it("return correct order", () => {
    return request(app)
      .get("/villes?sortBy=hab")
      .expect(200)
      .then(res => {
        expect(res.body).toMatchObject([
          { name: "Reims", hab: 3 },
          { name: "Paris", hab: 2 }
        ]);
      });
  });

  it("can vote for a given ville", () => {
    return request(app)
      .post("/villes/Paris")
      .send({ offset: 1, comment: "champion" })
      .expect(201)
      .then(res => {
        expect(res.body.social.votes).toBe(3);
        expect(res.body.social.score).toBe(6);
        expect(res.body.social.comments).toEqual(["gg", "champion"]);
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
