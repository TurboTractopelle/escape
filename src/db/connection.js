const mongoose = require("mongoose");
const url = require("../appcfg").MONGO;

mongoose.connect(url);

const db = mongoose.connection;

db.on("connection", () => console.log("gg"));

module.exports = db;
