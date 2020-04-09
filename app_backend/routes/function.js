const RabbitmqWrapper = require('../rabbitmq/rabbitmq.js')

const changeBulbState = async (req, res) => {
    const value = req.params.value;
    console.log(value);
    
    if(value === 'favicon.ico'){
        return ;
    }
    
    try {
        const url = 'amqp://ksh:1234@3.34.5.103';
        const queueName = 'req/hue/light';
        const rq = new RabbitmqWrapper(url, queueName);
        
        await rq.sendMessage(value);
  
        res.send(queueName);
    } catch (e) {
        console.error(e);
    }
  };

const getWeatherData = async (req, res) => {
    try{
        const url = 'amqp://ksh:1234@3.34.5.103';
        const queueName = 'req/weather/Info/general';
        const rq = new RabbitmqWrapper(url, queueName);

        const result = await rq.sendMessage('');
        console.log(result);
        res.send(queueName);
    }catch(e){
        console.log(e);
        res.send('error');
    }
    
}

module.exports = {
    changeBulbState, getWeatherData
}