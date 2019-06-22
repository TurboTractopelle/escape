const restify = require("restify");
const villesRoutes = require("./controllers/villes");
const connection = require("./db/connection");
const createServer = require("./app");
const NAME = require("./appcfg").NAME;
const PORT = require("./appcfg").PORT;

connection.on("open", initServer);

function initServer() {
  const server = createServer();

  server.listen(PORT, () =>
    console.log(`Listening on http://localhost:${PORT}`)
  );
}
