const express = require("express");
const router = express.Router();
const https = require("https");

// @desc    home/Landing page
// @route   GET /

router.get("/", (req, res) => {
  res.render("home");
});

// @desc    Weather
// @route    GET / weather

router.get("/weather", (req, res) => {
  res.render("weather");
});

router.post("/", (req, res) => {
  const units = "metric";
  const city = req.body.city;
  const url =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&cnt=7&appid=" +
    process.env.APP_ID +
    "&units=metric";

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      res.render("weather", { weatherData: weatherData });
    });
  });
});

router.post("/weather", (req, res) => {
  res.redirect("home");
});

module.exports = router;
