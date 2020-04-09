const amqp = require('amqplib/callback_api');
var express = require('express');
var router = express.Router();

router.get('/:value', (req,res)=> {
  console.log(req.params);
  const value = req.params.value;
  res.send(`current state = ${value}`);
})

// const hueBaseUrl = 'http://210.107.205.200:8080/api/wkcBD-lTULsGrCJ2hqZZqgeQsfathjs6zc3Rul1O/lights/10';

// router.get('/:value', (req, res) => {
//   console.log(req.params);
//   const value = req.params.value;
    
//     res.send(`current state = ${value}`);
// });


module.exports = router;
