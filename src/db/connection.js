const mongoose = require("mongoose");
const url = require("../appcfg").MONGO;

const options = { useNewUrlParser: true };
mongoose.connect(url, options);

const db = mongoose.connection;

db.on("connection", () => console.log("gg"));

module.exports = db;
