"use strict";
require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db/db");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));

app.use("/review", require("./routes/reviewRoutes.js"));
app.use("/user", require("./routes/userRoutes.js"));
app.use("/login", require("./routes/loginRoute.js"));

db.on("connected", () => {
  app.listen(8000, () => {
    console.log("express server started port 8000");
  });
});
