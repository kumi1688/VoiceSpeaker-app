const amqp = require('amqplib/callback_api');
var express = require('express');
var router = express.Router();
const {changeBulbState, getWeatherData} = require('./function.js');

amqp.connect('amqp://ksh:1234@3.34.5.103', (error0, connection)=>{
  if(error0){throw error0;}
  connection.createChannel((error1, channel)=>{
    if(error1) {throw error1};
    const queue = 'res/weather/info/general';
    
    channel.assertQueue(queue, {
      durable: false
    });

    console.log('[*] Waiting for messages in %s.', queue);

    channel.consume(queue, (msg)=>{
        const value = JSON.parse(msg.content);
        console.log('[x] Received ', value);   
    }, {noAck:true});
  });
});

router.get('/lights/:value', changeBulbState);
router.get('/weather/general', getWeatherData);

module.exports = router;
