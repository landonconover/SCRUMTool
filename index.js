var express = require('express'),
    app = express();
var mongoose = require('mongoose');
var model = require('./model.js');
var redis = require('redis');
<<<<<<< HEAD
var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: 8080});
=======
var ws = require('ws');
var express = require('express');
var app = express();
>>>>>>> 944645a424bb129dc05696fad0ba935651ba4853

var io = require('socket.io').listen(8080);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("Connection established");
});

mongoose.connect('mongodb://cemo:cemo@mongo.onmodulus.net:27017/ja3zudEb');

var client = redis.createClient(9981, 'beardfish.redistogo.com');

var dbAuth = function() { client.auth('baa6255500bc943a69b167ff55a92687'); }
client.addListener('connected', dbAuth);
client.addListener('reconnected', dbAuth);
dbAuth();


client.on("connect",function(){
	console.log("Redis is connected!");
});


//Some Server configuration
app.use(express.bodyParser());
app.set('view engine', 'ejs');

//Get latest movie
app.get('/', function(req, res) {
  res.render('index');
});

app.post("/Task/Move", function(req, res) {
	model.findOne({_id: req.body.taskId }, function (err, task) {
		task.stageId = req.body.stageId;
		task.save(function(err, task, numberAffected) {
			console.log('task updated');
			ws.emit('TaskUpdated', task); 
		});
	});	
});

//Start the app
app.listen(2013);


