var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var dishRouter = require('./dishRouter');
var leaderRouter = require('./leaderRouter');
var promoRouter = require('./promoRouter');

var app = express();



app.use(express.static(path.join(__dirname, '/public')));

app.use('/dishes', dishRouter);
app.use('/leadership', leaderRouter);
app.use('/promotions', promoRouter);

app.listen(port, hostname, function(){
  console.log('Server running at http://'+hostname+':'+port);
});