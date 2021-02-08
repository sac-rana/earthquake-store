const express = require("express");
const { join } = require("path");
const { Client } = require("pg");

const app = express();
const client = new Client({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
});
client
  .connect()
  .then(() => console.log("Connected to database"))
  .catch(err => console.log(err.stack));

app.use(express.static(join(process.cwd(), "public")));
app.set("views", join(process.cwd(), "public", "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  client
    .query("select * from earthquake_data limit 10")
    .then(result => res.render("index", { rows: result.rows }))
    .catch(err => console.log(err));
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
