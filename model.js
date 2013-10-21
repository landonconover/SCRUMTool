var mongoose = require('mongoose'),
    db = mongoose.connection;

//Listen to some database connection events
db.on('error', console.error);
db.once('open', function() {
  console.log('Database Connected.');
});

//Connect to the database
mongoose.connect('mongodb://cemo:cemo@mongo.onmodulus.net:27017/ja3zudEb');

//Create the sprint schema
var sprintSchema = new mongoose.Schema({
  name: { type: String }
});

//Sprint database object
var Sprint = mongoose.model('Sprint', sprintSchema);


//Create the story schema
var storySchema = new mongoose.Schema({
  title: { type: String },
  sprintId: [{type: mongoose.Schema.Types.ObjectId, ref:'Sprint'}]
});

//Story database object
var Story = mongoose.model('Story', storySchema);


//Create the task schema
var taskSchema = new mongoose.Schema({
  title: { type: String },
  storyId: [{type: mongoose.Schema.Types.ObjectId, ref:'Story'}],
  stageId: [{type: mongoose.Schema.Types.ObjectId, ref:'Stage'}],
  ownerId:[{type: mongoose.Schema.Types.ObjectId, ref:'Owner'}]
});

//Task database object
var Task = mongoose.model('Task', taskSchema);


//Create the stage schema
var stageSchema = new mongoose.Schema({
  name: { type: String }
});

//Stage database object
var Stage = mongoose.model('Stage', stageSchema);


//Create the owner schema
var ownerSchema = new mongoose.Schema({
  name: { type: String }
});

//Stage database object
var Owner = mongoose.model('Owner', ownerSchema);

