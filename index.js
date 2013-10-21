var mongoose = require('mongoose');
var model = require('./model.js');
var redis = require('redis');
var ws = require('ws');


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

client.on("taskUpdated", function(channel, message) {
    try { var task = JSON.parse(message); }
    catch (SyntaxError) { return false; }
});

client.on("connect",function(){
	console.log("Redis is connected!");
});
