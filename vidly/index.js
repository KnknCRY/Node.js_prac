require("express-async-errors"); //一定要在最上面require
const winston = require("winston");
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

winston.add(winston.transports.File, { filename: "logfile.log" });

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
