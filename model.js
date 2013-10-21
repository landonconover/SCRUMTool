var mongoose = require('mongoose');
//Create the sprint schema
var sprintSchema = new mongoose.Schema({
  name: { type: String }
});

//Sprint database object
module.exports.Sprint = mongoose.model('Sprint', sprintSchema);


//Create the story schema
var storySchema = new mongoose.Schema({
  title: { type: String },
  sprintId: [{type: mongoose.Schema.Types.ObjectId, ref:'Sprint'}]
});

//Story database object
module.exports.Story = mongoose.model('Story', storySchema);


//Create the task schema
var taskSchema = new mongoose.Schema({
  title: { type: String },
  storyId: [{type: mongoose.Schema.Types.ObjectId, ref:'Story'}],
  stageId: [{type: mongoose.Schema.Types.ObjectId, ref:'Stage'}],
  ownerId:[{type: mongoose.Schema.Types.ObjectId, ref:'Owner'}]
});

//Task database object
module.exports.Task = mongoose.model('Task', taskSchema);


//Create the stage schema
var stageSchema = new mongoose.Schema({
  name: { type: String }
});

//Stage database object
module.exports.Stage = mongoose.model('Stage', stageSchema);


//Create the owner schema
var ownerSchema = new mongoose.Schema({
  name: { type: String }
});

//Stage database object
module.exports.Owner = mongoose.model('Owner', ownerSchema);

