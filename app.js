const express = require("express");
const app = express();
const PORT = 8000;
const fs = require("fs");
const db = "./data/notes.json";

app.set("view engine", "pug");
app.use("/static", express.static("assets"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("Intro");
});


app.get("/home", (req, res) => {
  fs.readFile(db, (err, data) => {
    if (err) throw err;

    const notes = JSON.parse(data);

    res.render("home", { notes: notes });
  });
});




app.listen(PORT, () => {
  console.log("App is running on the Port : " + PORT);
});
var id = function () {
  return "_" + Math.random().toString(36);
};
