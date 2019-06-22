const mongoose = require("mongoose");
const db = require("./connection");

const villeSchema = new mongoose.Schema({
  name: String,
  hab: Number,
  social: { score: Number, votes: Number, comments: [String] }
});

const Villes = db.model("Ville", villeSchema);

module.exports = Villes;
