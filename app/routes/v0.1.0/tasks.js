var express = require('express');
var router = express.Router();

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
	var time		 	= req.body.time;
	var desc			= req.body.desc;
	var callback_url 			= req.body.callback_url;
	var is_finished 	= 0
	
	if(req.body.is_finished && req.body.is_finished != 0){
		is_finished = req.body.is_finished;
	}
	//
		
	var new_task = new model.TaskModel({
		time: time ,
		desc: desc,
		callback_url: callback_url,
		is_finished: is_finished
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

module.exports = router;
