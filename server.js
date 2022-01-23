const express = require("express");
const res = require("express/lib/response");
const path = require("path");
const randomID = require("@przemo41/randomid-generator");
const hbs = require("express-handlebars");

const app = express();

app.engine(".hbs", hbs());
app.set("view engine", ".hbs");

app.use((req, res, next) => {
  res.show = (name) => {
    res.sendFile(path.join(__dirname, `/public/${name}`));
  };
  next();
});

app.use("/user/settings", (req, res, next) => {
  res.show("login.html");

  // next();
});

app.use("/user/panel", (req, res, next) => {
  res.show("login.html");
  // next();
});

app.get("/", (req, res) => {
  res.show("index.html");
});

app.get("/home", (req, res) => {
  res.show("index.html");
});

app.get("/about", (req, res) => {
  res.show("about.html");
});

app.get("/hello/:name", (req, res) => {
  res.render("hello", { layout: false, name: req.params.name });
});

app.use(express.static(path.join(__dirname, "./public")));

app.use((req, res, next) => {
  res.status(404).show("notFound.html");
});

app.listen(8000, () => {
  console.log("Server is running on port: 8000");
});
