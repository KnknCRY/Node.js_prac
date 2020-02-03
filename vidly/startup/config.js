const config = require("config");

module.exports = function() {
  //export vidly_jwtPrivateKey=mySecureKeyc
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR : jwtPrivateKey is not defined.");
  }
};
