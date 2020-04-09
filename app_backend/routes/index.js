const amqp = require('amqplib/callback_api');
var express = require('express');
var router = express.Router();
const sendMessage = require('./function.js').push_my_message;

router.get('/:value', sendMessage);

module.exports = router;
