const Villes = require("../db/Villes");

/**
 * @param  {any} server
 * @returns {any} server
 */
function villesRoutes(server) {
  server.get("/test", test);
  server.post("/paris", postParis);
  server.get("/paris", getParis);
  return server;
}

function test(req, res, next) {
  res.header("content-type", "text/plain");
  res.send("test path working");
  next();
}

async function postParis(req, res, next) {
  try {
    await Villes.create({ name: "Paris", hab: 10 });
    res.send("Paris added");
    next();
  } catch (e) {
    console.log(e);
  }
}

async function getParis(req, res, next) {
  try {
    const data = await Villes.find({ name: "Paris" });
    res.header("content-type", "json");
    res.send(data);
    next();
  } catch (e) {
    console.log(e);
  }
}

module.exports = villesRoutes;
