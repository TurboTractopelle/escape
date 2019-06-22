const Villes = require("../db/Villes");
const connection = require("../db/connection");

/**
 * @param  {any} server
 * @returns {any} server
 */
function villesRoutes(server) {
  server.get("/test", test);
  server.post("/drop", drop);
  server.post("/addville", addVille);
  server.get("/villes/:ville", getVille);
  server.get("/villes", getVilles);
  return server;
}

function test(req, res, next) {
  res.header("content-type", "text/plain");
  res.send("test path working");
  next();
}

async function addVille(req, res, next) {
  try {
    await Villes.insertMany(req.body);
    res.send("added");
    next();
  } catch (e) {
    res.send("error");
  }
}

async function getVille(req, res, next) {
  try {
    console.log(req.params);
    const { ville } = req.params;
    const data = await Villes.find({ name: ville });
    res.header("content-type", "json");
    res.send(data);
    next();
  } catch (e) {}
}

async function drop(req, res, next) {
  await connection.collections["villes"].drop(function(err) {
    console.log("collection dropped");
  });
  res.send("db dropped");
  next();
}

async function getVilles(req, res, next) {
  const data = await Villes.find().sort({ name: 1 });
  res.send(data);
  next();
}

module.exports = villesRoutes;
