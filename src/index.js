const fs = require("fs");
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const hbs = require("hbs");

app.use(express.json());

app.set("view engine", "hbs");
console.log(path.join(__dirname, "../src/assets/chart.png"));
const user = path.join(__dirname, "../src/data/user.json");
const msg = path.join(__dirname, "../src/data/messages.json");
const monthly = path.join(__dirname, "../src/data/monthly.json");


// my middleware - using my dependencies

app.use(express.json());
app.use(
  "/css",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
);
app.use(
  "/image",
  express.static(path.join(__dirname, "../src/assets/chart.png"))
);
app.use(
  "/logo",
  express.static(path.join(__dirname, "../src/assets/logo.png"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
);
app.use(
  "/jquery",
  express.static(path.join(__dirname, "../node_modules/jquery/dist"))
);



var userData;
var messages;
var sales;

fs.readFile(user, "utf-8", (res, data) => {
  userData = JSON.parse(data);
  console.log(userData);
});
fs.readFile(msg, "utf-8", (res, data) => {
  messages = JSON.parse(data);
});
fs.readFile(monthly, "utf-8", (res, data) => {
  sales = JSON.parse(data);
  // console.log(sales);
});


app.get("/", (req, res) => {
  res.render("index");
});
app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});
app.get("/api/messages",(req,res)=>{
  res.status(200).json(messages)
})
app.get("/api/monthly-sales-data",(req,res)=>{
  res.status(200).json(sales)
})

app.post("/api/login", (req, res) => {
  console.log("req body ----",req.body);
  console.log("user data ----",userData);
  if (req.body.name == userData.name && req.body.password == userData.password) {
    res.status(200).send("confirm");
  }
  else{
    res.status(401).send("UnAuthorized")
  }
});


app.listen(port, () => {
  console.log(`listening at port number ${port}`);
});
