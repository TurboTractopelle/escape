/**
 * @param  {any} server
 * @returns {any} server
 */
function villesRoutes(server) {
  server.get("/", getHome);
  return server;
}

function getHome(req, res, next) {
  res.send("gg");
}

module.exports = villesRoutes;
