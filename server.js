"use strict";
require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db/db");
const localhost = require("./security/localhost.js");
const production = require("./security/production");

app.use(express.urlencoded({ extended: false }));

app.use("/review", require("./routes/reviewRoutes.js"));

process.env.NODE_ENV = process.env.NODE_ENV || "development";
if (process.env.NODE_ENV === "production") {
  production(app, 3000);
} else {
  // production(app, 3000);
  localhost(app, 8000, 3000);
}
/*
db.on("connected", () => {
  app.listen(3000, () => {
    console.log("express server started port 3000");
  });
});
*/
