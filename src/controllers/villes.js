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
  server.post("/villes/:ville", vote);
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
    const data = await Villes.insertMany(req.body);
    res.send(data);
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

async function vote(req, res, next) {
  console.log("rec", req.body);
  const { offset = 0, comment = "" } = req.body;

  let ville = await Villes.findOne({ name: req.params.ville });

  const data = await Villes.findOneAndUpdate(
    { _id: ville.id },
    {
      $inc: { "social.votes": 1, "social.score": +offset },
      $push: { "social.comments": comment }
    },
    { new: true }
  );
  res.send(201, data);
  next();
}

async function getVilles(req, res, next) {
  const { sortBy = "name" } = req.query;
  let { firstLetter = "" } = req.query;
  const avaSortBy = ["name", "hab"];

  if (!avaSortBy.includes(sortBy)) {
    res.send(400, `Wrong param: ${sortBy}`);
    next();
  } else {
    let data;
    if (firstLetter) {
      data = await Villes.find({
        name: { $regex: `^${firstLetter}.+`, $options: "i" }
      }).sort({ [sortBy]: -1 });
    } else {
      data = await Villes.find().sort({ [sortBy]: -1 });
    }
    res.send(data);
    next();
  }
}

module.exports = villesRoutes;
