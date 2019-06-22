const createServer = require("./server");
console.log("Lancement de l'app");
const NAME = require("./appcfg").NAME;
const PORT = require("./appcfg").PORT;

const server = createServer(NAME);

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
