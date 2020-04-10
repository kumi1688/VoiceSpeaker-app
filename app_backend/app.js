const RabbitmqWrapper = require('./rabbitmq/rabbitmq.js');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const amqp = require('amqplib/callback_api');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.io = require('socket.io')();
const socket = app.io.on('connection', function(){
  console.log('웹 소켓 연결됨');
});

amqp.connect('amqp://ksh:1234@3.34.5.103', (error0, connection)=>{
  if(error0){throw error0;}
  connection.createChannel((error1, channel)=>{
    if(error1) {throw error1;}

    channel.assertQueue('res/hue/state', {
      durable: false
    });
        
    channel.consume('res/hue/state', async (msg)=>{
      console.log('[x] Received %s', 'res/hue/state');
      // console.log(JSON.parse(msg.content.toString()));
      
      socket.emit("bulbState", {
        data: JSON.parse(msg.content.toString())
      });
    }, {noAck:true});
  })
});

module.exports = {
  ws: app.io,
  app: app
};