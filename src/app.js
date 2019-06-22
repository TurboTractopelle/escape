const restify = require("restify");
const villesRoutes = require("./controllers/villes");
console.log("Lancement de l'app");

function createServer(name = "test") {
  console.log(`Creating ${name} server`);
  const server = restify.createServer();
  villesRoutes(server);

  server.use(restify.plugins.jsonBodyParser({ mapParams: true }));
  server.use(restify.plugins.queryParser({ mapParams: false }));
  return server;
}

module.exports = createServer;
