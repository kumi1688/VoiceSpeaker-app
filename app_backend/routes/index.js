var express = require('express');
var router = express.Router();
const {changeBulbState, getWeatherData, getBulbState} = require('./function.js');

router.get('/hue/change/:value', changeBulbState);
router.get('/hue/state', getBulbState);
router.get('/weather/general', getWeatherData);

module.exports = router;
