
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


// var checkInInfoSchema= new Schema({
//   name:String,
//   loginSerialId:Number
// });
//
//
// var loginUserSchema = new Schema({
//   sn : { type: Number, unique:true }
//   ,uname: {type:String, unique:true}
//   ,pass:String
// });
//
// var registerUserSchema = new Schema({
//   sn : { type: Number, unique:true }
//   , name: String   //his/her name
//   ,pass:String,
//   companyKey:{type:String},
//   uname:{type:String,unique:true}
// });
//
//
// var checkInOutSchema = new Schema({
//   uname: String
//   ,companyKey:String
//   ,task:String
//   ,inTime:String
//   ,outTime:String
//   ,date:{type:String}
//   ,serialId:{type:Number,unique:true}
//   ,online:Boolean
// });
//
// //Different schema for same collection "allUsers"
// var allUser=mongoose.model('allUsers',loginUserSchema);
// var registerUser=mongoose.model('allUsers',registerUserSchema);
//
// //Different schema for same collection "checkInOut"
// var checkInOut=mongoose.model('checkInOut',checkInOutSchema);
// var checkInInfo=mongoose.model('checkInOut',checkInInfoSchema);

module.exports = {
 	TokenModel:TokenModel,
	TaskModel :TaskModel
}
