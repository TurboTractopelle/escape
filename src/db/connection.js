const mongoose = require("mongoose");
const dburl = require("../appcfg").MONGO;

const url = process.env.MONGODB_URI || global.MONGODB_URI || dburl;

const options = {
  useNewUrlParser: true,
  connectTimeoutMS: 10000,
  reconnectInterval: 100,
  useCreateIndex: true,
  replset: 30000
};

const connection = mongoose.createConnection(url, options);

connection.on("connection", () => console.log("gg"));

if (process.env.NODE_ENV !== "test") {
  connection.on("open", () => {
    console.log(`✅  Connected to mongoconnection database ${connection.name}`);
  });
}

module.exports = connection;
