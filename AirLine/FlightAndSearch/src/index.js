const express = require("express");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/index.js");
const { PORT, SYNC_DB } = require("./config/serverConfig.js");
const CityRepository = require("./respository/city-respository.js");
const db = require("./models/index.js");

const setupAndStartServer = async () => {
  const app = express();
  const port = PORT || 4000;
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", apiRoutes);
  app.listen(port, async () => {
    console.log(`Server listening on port ${port}`);

    // if (SYNC_DB) {
    //   db.sequelize.sync({ alter: true });
    // }
  });
};

setupAndStartServer();
