const express = require("express");
const { PORT } = require("./config/serverConfig");
const app = express();
const apiRoutes = require("./routes/index.js");
const bodyParser = require("body-parser");
const db = require("./models/index.js");
const prepareAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/authservice/api", apiRoutes);
  app.listen(3001, () => {
    console.log("Server started at", PORT);
    // if (process.env.DB_SYNC) {
    //   db.sequelize.sync({ alter: true });
    // }
  });
};

prepareAndStartServer();
