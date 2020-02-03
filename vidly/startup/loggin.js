//讓每個router裡面如果發生async error，可以不用在每個await加上try catch
//他會自動call error middleware
//一定要在最上面require
require("express-async-errors");
//winston是用來log exception的
const winston = require("winston");
require("winston-mongodb");

module.exports = function() {
  //這只能抓到sync的錯誤，讓node不因為錯誤而中止執行
  // process.on("uncaughtException", ex => {
  //   winston.error(ex.message, ex);
  //   process.exit(1);
  // });
  //這邊以winston.handleExceptions取代

  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaoghtException.log" })
  );
  process.on("unhandledRejection", ex => {
    //winston.error(ex.message, ex);
    //process.exit(1);
    //硬是把Rejection變成Exception他就會直接丟進去winston.handleExceptions
    throw ex;
  });

  //把express的錯誤訊息直接印出來到logfile.log，若檔案不存在會自動建立
  winston.add(winston.transports.File, { filename: "logfile.log" });
  //把錯誤訊息直接存在MongoDB，會自動建立一個log colection
  winston.add(winston.transports.MongoDB, {
    db: "mongodb://localhost/vidly",
    level: "info"
  });
};
