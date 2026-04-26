
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HOME PAGE
app.get("/", (req, res) => {
  res.render("index");
});

// ADMIN PAGE
app.get("/admin", (req, res) => {
  res.render("admin");
});

// TEST ROUTE
app.get("/test", (req, res) => {
  res.send("Server funzionante");
});

app.listen(PORT, () => {
  console.log("Server avviato su porta " + PORT);
});
