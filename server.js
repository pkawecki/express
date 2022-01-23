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

//////////////////////////////////////

app.get("/hello/:name", (req, res) => {
  res.render("hello", { name: req.params.name });
});

app.get("/user/settings", (req, res, next) => {
  res.render("login");
});

app.get("/user/panel", (req, res) => {
  res.render("login");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/home", (req, res) => {
  res.render("index");
});

////NEW ONES
app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/info", (req, res) => {
  res.render("info");
});

app.get("/history", (req, res) => {
  res.render("history", { layout: "dark" });
});

app.use(express.static(path.join(__dirname, "./public")));

app.use((req, res, next) => {
  res.status(404).render("notFound");
});

app.listen(8000, () => {
  console.log("Server is running on port: 8000");
});
