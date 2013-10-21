var express = require('express'),
    app = express();
//var mongoose = require('mongoose');
//var model = require('./model.js');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function callback () {
// 	console.log("Connection established");
// });

// mongoose.connect('mongodb://cemo:cemo@mongo.onmodulus.net:27017/ja3zudEb');

//Some Server configuration
app.use(express.bodyParser());
app.set('view engine', 'ejs');

//Get latest movie
app.get('/', function(req, res) {
  res.render('index');
});

//Start the app
app.listen(2013);