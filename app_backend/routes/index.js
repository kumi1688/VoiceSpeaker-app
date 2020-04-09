
var express = require('express');
var router = express.Router();
const {changeBulbState, getWeatherData} = require('./function.js');

router.get('/lights/:value', changeBulbState);
router.get('/weather/general', getWeatherData);

module.exports = router;
