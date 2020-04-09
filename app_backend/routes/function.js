const RabbitmqWrapper = require('../rabbitmq/rabbitmq.js')
const push_my_message = async (req, res) => {
    const value = req.params.value;
    console.log(value);
    
    if(value === 'favicon.ico'){
        return ;
    }
    
    try {
        const url = 'amqp://ksh:1234@3.34.5.103';
        const queueName = 'hue/light';
        const rq = new RabbitmqWrapper(url, queueName);
        
        await rq.send_helloWorld(value);
  
        res.send(queueName);
    } catch (e) {
        console.error(e);
    }
  };

module.exports = {
    push_my_message
}