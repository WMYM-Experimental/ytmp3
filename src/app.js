/*
################## REQUIRE MODULES ##################
*/
require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

/*
################## SERVER CONFIG ##################
*/
const app = express();
const DEFAULT_PORT = 3000;
app.set("port", process.env.PORT || DEFAULT_PORT);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

/*
################## ROUTES ##################
*/
// This is a very litle project so i do not consider a routes folder as a necesity
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get("/", (req, res, next) => {
  res.render("index");
});

app.post("/convert-to-mp3", async (req, res, next) => {
  const videoID = req.body.ID;
  if (videoID === undefined || videoID === "" || videoID === null) {
    return res.render(path.join(__dirname, "views/index"), {
      success: false,
      mssg: "Please insert a valid Video ID",
      // TODO: Print Error in index
    });
  } else {
    console.log(videoID);
    const fetchAPI = await fetch(
      `https://youtube-mp36.p.rapidapi.com/dl?id=${videoID}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "",
          // put the api host"",
          "x-rapidapi-key": "",
          // put the api key"",
        },
      }
    );

    const fetchResponse = await fetchAPI.json();

    if (fetchResponse.status === "ok")
      return res.render("index", {
        success: true,
        song_name: fetchResponse.title,
        song_link: fetchResponse.link,
      });
    else
      return res.render("index", {
        success: false,
        mssg: fetchResponse.msg,
      });
  }
});

/*
################## SERVER LISTENING ##################
*/
app.listen(app.get("port"), () => {
  console.log("Server on Port: ", app.get("port"));
});
