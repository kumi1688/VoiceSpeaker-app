const RabbitmqWrapper = require('../rabbitmq/rabbitmq.js')
const amqp = require('amqplib/callback_api');

const url = 'amqp://ksh:1234@3.34.5.103';

const changeBulbState = async (req, res) => {
    const value = req.params.value;
    console.log(value);
    
    if(value === 'favicon.ico'){
        return ;
    }
    
    try {
        let queueName = 'req/hue/light';
        const rq = new RabbitmqWrapper(url, queueName);
        
        await rq.sendMessage(value);
        console.log(value);
        res.sendStatus(200);
    } catch (e) {
        console.error(e);
    }
  };

const getBulbState = async (req, res) => {
    try{
        let queueName = 'req/hue/state';
        let rq = new RabbitmqWrapper(url, queueName);
        await rq.sendMessage('');
        
        queueName = 'res/hue/state';
        rq = new RabbitmqWrapper(url, queueName);
        const result = await rq.recvMessage('json');
        res.send(result);
    }catch(e){
        console.log(e);
    }
}

const getWeatherData = async (req, res) => {
    try{
        let queueName = 'req/weather/info/general';
        let rq = new RabbitmqWrapper(url, queueName);
        await rq.sendMessage('');

        queueName = 'res/weather/info/general';
        rq = new RabbitmqWrapper(url, queueName);
        const result = await rq.recvMessage('json');
        res.send(result);
    }catch(e){
        console.log(e);
    }
}

module.exports = {
    changeBulbState, getWeatherData, getBulbState
}