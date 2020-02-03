const express = require("express");
const winston = require("winston");
const app = express();

require("./startup/loggin")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

//------------For exception testing--------------
//throw new Error("Something failed during startup.");
//const p = Promise.reject(new Error("Something failed miserably."));
//p.then(() => console.log("Done"));
//-----------------------------------------------

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
