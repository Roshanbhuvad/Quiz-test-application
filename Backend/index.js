const express = require("express");
const assert = require("assert");
const path = require("path");
const fallback = require("express-history-api-fallback");
const devConfig = require("./config/setup/dev");
const prodConfig = require("./config/setup/prod");
const {
  NODE_ENV
} = require("./config/env");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const mongoose = require("mongoose");
dotenv.config({
  silent: true
});

const url = process.env.MONGO_HOST;
const secretString = process.env.SECRET_STRING;

const apiRoutes = require("./routes/api-routes");
const passportRoutes = require("./routes/passport");
const PORT =8000;
const app = express();

if (NODE_ENV === "development") {
  devConfig(app);
} /* else {
  prodConfig(app);
} */

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect(url, () => {
  console.log("connected through mongoose");
});

//app.use(express.static("quiz/client"));

app.use(cookieParser(secretString));
app.use(
  session({
    secret: secretString,
    resave: true,
    secure: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

// connect authentication and api routes
app.use(passportRoutes);
app.use(apiRoutes);

//app.use(fallback(path.join(__dirname, "../../dist/client/index.html")));

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(
    `The Express Server is Listening at port ${PORT} in ${NODE_ENV} mode`
  );
});

module.exports = app;