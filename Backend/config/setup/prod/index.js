const compression = require("compression");

(app) => {
  app.use(compression());
};