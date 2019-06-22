const Villes = require("../db/Villes");

/**
 * @param  {any} server
 * @returns {any} server
 */
function villesRoutes(server) {
  server.get("/test", test);
  server.post("/paris", paris);
  return server;
}

function test(req, res, next) {
  res.header("content-type", "text/plain");
  res.send("test path working");
  next();
}

async function paris(req, res, next) {
  await Villes.create({ name: "Paris", hab: 10 });
  res.send("Paris added");
}

module.exports = villesRoutes;
