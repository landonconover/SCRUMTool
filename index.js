var express = require('express'),
    app = express();
var mongoose = require('mongoose');
var model = require('./model.js');
var redis = require('redis');
var WebSocketServer = require('ws').Server
  , ws = new WebSocketServer({port: 8888});

var clients = [];


var broadcast = function(data) {
    for(var i in clients)
        clients[i].send(data);
};

ws.on('connection', function(ws) {
	clients.push(ws);
	console.log("A New Socket is Connected");
	ws.on('message',function(msg){
		var data = JSON.parse(msg);
		model.Task.findOne({_id: data.taskId }, function (err, task) {
		task.stageId = data.stageId;
		task.save(function(err, task, numberAffected) {
			console.log('task updated');
			broadcast(task);
		});
	});	
		console.log(data);
	});
});


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
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

//Get latest movie
app.get('/', function(req, res) {
	model.Task.find({}, function(err, modelo){
		console.log(arguments);
		if(err) {
	      return res.send(err.message);
	    }
	    console.log(modelo);
		res.render('index', { tasks : modelo });
	});
  
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


