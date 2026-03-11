const express = require('express');
const router = express.Router();
const { getWeatherByCity } = require('../controllers/weatherController');

// GET /weather?city=CityName&units=metric
router.get('/', getWeatherByCity);

module.exports = router;
