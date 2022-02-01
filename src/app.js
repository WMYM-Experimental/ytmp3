// require modules
require("dotenv").config();

const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

// server app config
const app = express();
const DEFAULT_PORT = 4000;
app.set("port", process.env.PORT || DEFAULT_PORT);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// requests
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("Hi bro");
});

/*
app.get("/", (req, res, next) => {

});
*/

// server listening
app.listen(app.get("port"), () => {
  console.log("Server on Port: ", app.get("port"));
});
