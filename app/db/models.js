var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


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
 	TokenModel:TokenModel
}
