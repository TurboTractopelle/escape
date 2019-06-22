const restify = require("restify");
const villesRoutes = require("./controllers/villes");

/**
 * @param  {String} name
 * @returns - server instance
 */
function server(name = "test") {
  console.log(`Creating ${name} server`);
  const server = restify.createServer();
  villesRoutes(server);

  //   server.use(restify.plugins.jsonBodyParser({ mapParams: true }))
  return server;
}

module.exports = server;
