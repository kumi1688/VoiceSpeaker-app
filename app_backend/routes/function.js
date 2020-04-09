const RabbitmqWrapper = require('../rabbitmq/rabbitmq.js')
const amqp = require('amqplib/callback_api');

const changeBulbState = async (req, res) => {
    const value = req.params.value;
    console.log(value);
    
    if(value === 'favicon.ico'){
        return ;
    }
    
    try {
        const url = 'amqp://ksh:1234@3.34.5.103';
        let queueName = 'req/hue/light';
        const rq = new RabbitmqWrapper(url, queueName);
        
        await rq.sendMessage(value);
        res.sendStatus(200);
    } catch (e) {
        console.error(e);
    }
  };

const getWeatherData = async (req, res) => {
    try{
        const url = 'amqp://ksh:1234@3.34.5.103';
        let queueName = 'req/weather/info/general';
        let rq = new RabbitmqWrapper(url, queueName);
        await rq.sendMessage('');

        queueName = 'res/weather/info/general';
        rq = new RabbitmqWrapper(url, queueName);
        const result = await rq.recvMessage('json');
        res.sendStatus(200);
    }catch(e){
        console.log(e);
    }
}

module.exports = {
    changeBulbState, getWeatherData
}