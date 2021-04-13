"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db/db");

app.use(express.urlencoded({ extended: false }));

app.use("/review", require("./routes/reviewRoutes.js"));

db.on("connected", () => {
  app.listen(3000, () => {
    console.log("express server started port 3000");
  });
});
