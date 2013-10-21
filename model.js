var mongoose = require('mongoose');
//Create the sprint schema
var sprintSchema = new mongoose.Schema({
  name: { type: String }
});

//Sprint database object
module.exports.Sprint = mongoose.model('sprint', sprintSchema);


//Create the story schema
var storySchema = new mongoose.Schema({
  title: { type: String },
  sprintId: [{type: mongoose.Schema.Types.ObjectId, ref:'sprint'}]
});

//Story database object
module.exports.Story = mongoose.model('story', storySchema);


//Create the task schema
var taskSchema = new mongoose.Schema({
  title: { type: String },
  storyId: [{type: mongoose.Schema.Types.ObjectId, ref:'story'}],
  stageId: [{type: mongoose.Schema.Types.ObjectId, ref:'stage'}],
  ownerId:[{type: mongoose.Schema.Types.ObjectId, ref:'owner'}]
});

//Task database object
module.exports.Task = mongoose.model('task', taskSchema);


//Create the stage schema
var stageSchema = new mongoose.Schema({
  name: { type: String }
});

//Stage database object
module.exports.Stage = mongoose.model('stage', stageSchema);


//Create the owner schema
var ownerSchema = new mongoose.Schema({
  name: { type: String }
});

//Stage database object
module.exports.Owner = mongoose.model('owner', ownerSchema);

