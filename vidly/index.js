require("express-async-errors"); //一定要在最上面require
const winston = require("winston");
require("winston-mongodb");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const express = require("express");
const auth = require("./routes/auth");
const config = require("config");
const error = require("./middleware/error");
const app = express();

process.on("uncaughtException", ex => {
  console.log("We got uncaught exception");
  winston.error(ex.message, ex);
});

//把錯誤訊息直接印出來到logfile.log，若檔案不存在會自動建立
winston.add(winston.transports.File, { filename: "logfile.log" });
//把錯誤訊息直接存在MongoDB，會自動建立一個log colection
winston.add(winston.transports.MongoDB, {
  db: "mongodb://localhost/vidly",
  level: "info"
});

throw new Error("Something failed during startup.");

//export vidly_jwtPrivateKey=mySecureKeyc
if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR : jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

//error middleware要在所有middleware後面
//所以我在每個route裡面的api呼叫next就會進來
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
