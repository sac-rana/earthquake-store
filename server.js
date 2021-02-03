const { Client } = require("pg");
const express = require("express");
// const client = new Client({
// connectionString: "postgres://postgres:sachin@localhost:5432/database",
// });

// client.connect();

const app = express();

app.use((req, res, next) => {
  console.log("hello");
  next();
});
app.use(() => {
  console.log("guys");
});

app.get("/", (req, res) => {
  console.log("this is me");
  res.sendFile("index.html");
});

app.listen(8000);
