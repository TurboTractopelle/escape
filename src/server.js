const restify = require("restify");
const villesRoutes = require("./controllers/villes");

/**
 * @param  {String} name
 * @returns - server instance
 */
function server(name) {
  console.log(`Creating ${name} server`);
  const server = restify.createServer({ name });
  villesRoutes(server);
  return server;
}

module.exports = server;
