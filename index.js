var mongoose = require('mongoose');
var model = require('./model.js');

var io = require('socket.io').listen(8080);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("Connection established");
});

mongoose.connect('mongodb://cemo:cemo@mongo.onmodulus.net:27017/ja3zudEb');


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
});
