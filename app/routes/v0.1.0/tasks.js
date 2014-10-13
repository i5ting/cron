var express = require('express');
var router = express.Router();
var msgpack = require('msgpack');
var request = require('request');

// var b = msgpack.pack(o);
// var oo = msgpack.unpack(b);

/* GET token create. */
router.post('/', function(req, res) {
	var db = req.db;
	var model = req.model
	var scheduleManager = req.scheduleManager
	
	console.log(req.body);
	console.log(req.query);
	
	//
	// - _id
	// - time
	// - desc
	// - callback_url
	// - is_finished
	// - create_at
	var time		 					= req.body.time;
	var desc							= req.body.desc;
	var callback_url 			= req.body.callback_url;
	var is_finished 			= 0;
	var callback_param		= req.body.data;
	
	if(req.body.is_finished && req.body.is_finished != 0){
		is_finished = req.body.is_finished;
	}
	//
	var str = msgpack.pack(callback_param)
	
	console.log(callback_param + 'str = '+ str)
		
	var new_task = new model.TaskModel({
		time				: time ,
		desc				: desc,
		callback_url: callback_url,
		is_finished : is_finished,
		callback_param: str
	});

	new_task.save(function (err, new_task) {
	  if (err) return console.error(err);

		 scheduleManager.addTask(new_task._id,new_task.time,new_task.callback_url);
		 console.log('[TASK QUEUE LOG] add task in queue');
		 
		 res.status(200).json({
		 	 data:new_task,
			 status:{
				 code: 0,
				 msg : 'success'
			 }
		 });
	});
});

router.get('/', function(req, res) {
	var db = req.db;
	var model = req.model
	
	// Tank.find({ size: 'small' }).where('createdDate').gt(oneYearAgo).exec(callback);
	model.TaskModel.find().exec(function(err,docs){
		if (err) return console.error(err);
		
		res.json({
		  count:docs.length,
		  data:docs,
		  status:{
			  code: 0,
			  msg : 'success'
		  }
		});	
	});  
});


/**
 * 根据id获得task，然后发送到具体的请求
 * 由于task是cache到mongodb里，所以要多转了几步
 */ 
router.get('/:id/request/send', function(req, res) {
	var db = req.db;
	var model = req.model
	
	var _id = req.params.id
	
	console.log("开始执行 id" + _id + " task");
	

	// - is_finished
	// - create_at
	var time		 					= req.body.time;
	var desc							= req.body.desc;
	var callback_url 			= req.body.callback_url;
	var is_finished 			= 0;
	var callback_param		= req.body.data;
	
	
	model.TaskModel.findOne({ '_id': _id }, 'time desc callback_url callback_param', function (err, task) {
	  if (err) return handleError(err);
		
		console.log(task);
		
		var oo = msgpack.unpack( new Buffer(task.callback_param) );
	  console.log('%s %s is a %s.  %s', task.time, task.desc, task.callback_url, oo.from ) // Space Ghost is a talk show host.
		// TODO: 此时应使用post方法完成
		
		// request('http://www.google.com', function (error, response, body) {
// 		  if (!error && response.statusCode == 200) {
// 		    console.log(body) // Print the google web page.
// 		  }
// 		})
//
		res.json({
		  data:task,
		  status:{
			  code: 0,
			  msg : 'success'
		  }
		});	
	})
	
});


module.exports = router;
