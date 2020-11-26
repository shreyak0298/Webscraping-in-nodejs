// Get dependencies
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
const router = express.Router();
const Logger = require("./logger");
const logger = new Logger.Log();
logger.setOption("file", __filename.slice(__filename.indexOf("/server/") + 7));

const main = async () => {
  const app = express();

  app.use(helmet());
  app.use((req, res, next) => {
    next();
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  const corsOptions = {
    origin: process.env.CORS_BROWSER_ORIGIN.split(","),
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

  // Set our api routes
  router.use("/", cors(corsOptions), require("./routes")());

  /**
   **_ Get port from environment and store in Express.
   _**/
  app.use("/", router);

  const port = process.env.PORT || "3001";
  app.set("port", port);
  const server = http.createServer(app);

  server.listen(port, () => logger.info(`API running on localhost:${port}`));
};

main();
