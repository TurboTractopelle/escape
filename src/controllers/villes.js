const Villes = require("../db/Villes");
const connection = require("../db/connection");

/**
 * @param  {any} server
 * @returns {any} server
 */
function villesRoutes(server) {
  server.get("/test", test);
  server.post("/drop", drop);
  server.post("/paris", postParis);
  server.get("/paris", getParis);
  server.get("/villes", getVilles);
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
    next();
  } catch (e) {
    res.send("error");
  }
}

async function getParis(req, res, next) {
  try {
    const data = await Villes.find({ name: "Paris" });
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
  const data = await Villes.find();
  res.send(data);
  next();
}

module.exports = villesRoutes;
