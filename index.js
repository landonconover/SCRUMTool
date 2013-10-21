var express = require('express'),
    app = express();
var mongoose = require('mongoose');
var model = require('./model.js');
var redis = require('redis');
var ws = require('ws');

var io = require('socket.io').listen(8080);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("Connection established");
});

mongoose.connect('mongodb://cemo:cemo@mongo.onmodulus.net:27017/ja3zudEb');

<<<<<<< HEAD
var client = redis.createClient(9981, 'beardfish.redistogo.com');

var dbAuth = function() { client.auth('baa6255500bc943a69b167ff55a92687'); }
client.addListener('connected', dbAuth);
client.addListener('reconnected', dbAuth);
dbAuth();

client.on("taskUpdated", function(channel, message) {
    try { var task = JSON.parse(message); }
    catch (SyntaxError) { return false; }
});

client.on("connect",function(){
	console.log("Redis is connected!");
=======
//Some Server configuration
app.use(express.bodyParser());
app.set('view engine', 'ejs');

//Get latest movie
app.get('/', function(req, res) {
  res.render('index');
});

//Start the app
app.listen(2013);


io.sockets.on("connection", function(socket) {
	socket.on("TaskMoved", function(data) {
		model.findOne({_id: data.taskId }, function (err, task) {
			task.stageId = data.stageId;
			task.save(function(err, task, numberAffected) {
				console.log('task updated');
				io.sockets.emit('TaskUpdated', task); 
			});
		});	
	})
>>>>>>> 46fb21506265981d2b50e08c19c781d7e4c3b4a8
});
