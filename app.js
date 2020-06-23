const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const ejs = require("ejs");
//Load config
dotenv.config({ path: "./config/config.env" });

const app = express();

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.set("view engine", "ejs");

//Static folder
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use("/", require("./routes/index"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
