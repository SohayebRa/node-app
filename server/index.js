const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const cors = require("cors");

// BDD Mongo
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/restapis", {
  useNewUrlParser: true,
});

// Serveur
const app = express();

// Bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cors
app.use(cors());

// Routes de l'app
app.use("/", routes());

// Dossier publique
app.use(express.static("uploads"));

// Port
app.listen(5000);
