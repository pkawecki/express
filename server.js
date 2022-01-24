const express = require("express");
const res = require("express/lib/response");
const path = require("path");
const randomID = require("@przemo41/randomid-generator");
const hbs = require("express-handlebars");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// const upload = multer({ dest: "uploads/" });

const app = express();
app.use(express.static(path.join(__dirname, "./public")));

app.engine(".hbs", hbs());
app.set("view engine", ".hbs");

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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/contact/send-message", upload.single("picture"), (req, res) => {
  const { author, sender, title, message } = req.body;
  const pict = req.file;
  if (author && sender && title && message && pict) {
    res.render("contact", { isSent: true, picName: pict.originalname });
    // res.send("The message has been sent!");
  } else {
    res.render("contact", { isError: true });
    // res.send("You can't leave fields empty!");
  }
});

app.use((req, res, next) => {
  res.status(404).render("notFound");
});

app.listen(8000, () => {
  console.log("Server is running on port: 8000");
});
