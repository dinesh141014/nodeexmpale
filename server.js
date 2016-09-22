var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();
var request = require('request');
var http = require('http');
//var routes = require('./routes/');
//var users = require('./routes/');

var app = express();
/* var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

}) */
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);


/* app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}); */

/* router.get('/', function(req, res, next) {
  request({
    uri: 'http://swapi.co/api/',
    //qs: {
    //  api_key: '123456',
     // query: 'World of Warcraft: Legion'
    //}
  }).pipe(res);
}); */
app.post('/character', function(req, res, next){
   // req.body object has your form values
   console.log(req.body.clubname);
   console.log(req.body.clubtype);
});
app.get('/character',function(req,res){
	res.render('character');
	
});
app.get('/test.js', function(req, res) {
  res.set('Content-Type', 'application/javascript');
  res.render('planetresidents', { myVar : "dinesh" });
});
app.get('/', function(req, res){
  var options = {
    host : 'http://swapi.co',
    path : '/api/people/2/?format=json',
    port : 80,
    method : 'GET'
  }

  var request = http.request(options, function(response){
    var body = ""
    response.on('data', function(data) {
      body += data;
    });
    response.on('end', function() {
      res.send(JSON.parse(body));
    });
  });
  request.on('error', function(e) {
    console.log('Problem with request: ' + e.message);
  });
  request.end();
});
app.get('/characters',function(req,res)
{
	res.render('characters');
});
app.get('/character/:name',function(req,res)
{  
   res.send('test'+ req.params.name);
	//res.render('character');
});
app.get('/planetresidents',function(req,res)
{
	res.render('planetresidents');
});
/* if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
}); */

app.listen(process.env.PORT || 3000);
module.exports = app;
