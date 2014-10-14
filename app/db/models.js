var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

/** task
- id（uuid）
- time时间
- desc描述
- callback_url
- is_finished
- create_at  :  { type: Date, default: Date.now }
*/

var taskSchema = Schema({
  time: String,
	desc: String,
	callback_url: String,
	callback_param: String,
	is_finished : Number,
	is_stop : Number,
	create_at   : { type: Date, default: Date.now }
});

var TaskModel = mongoose.model('TaskModel', taskSchema)

var tokenSchema = Schema({
  app: String,
	version: String,
	os: String,
	token: String
});

var TokenModel = mongoose.model('TokenModel', tokenSchema)



module.exports = {
 	TokenModel:TokenModel,
	TaskModel :TaskModel
}
