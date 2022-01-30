// require modules
require("dotenv").config();

const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

// server app config
const app = express();
const DEFAULT_PORT = 4000;
app.set("port", process.env.PORT || DEFAULT_PORT);

// server listening
app.listen(app.get("port"), () => {
  console.log("Server on Port: ", app.get("port"));
});
