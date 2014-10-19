var express = require('express');
var router = express.Router();
var msgpack = require('msgpack');
var request = require('request');
var moment = require('moment');

// var b = msgpack.pack(o);
// var oo = msgpack.unpack(b);

var getOffDays = function(startDate, endDate) {    
	var mmSec = (endDate.getTime() - startDate.getTime()); //得到时间戳相减 得到以毫秒为单位的差    
	return (mmSec); //毫秒
};    

Date.prototype.Format = function (fmt) { //author: meizz 
	var o = {
	    "M+": this.getMonth() + 1, //月份 
	    "d+": this.getDate(), //日 
	    "h+": this.getHours(), //小时 
	    "m+": this.getMinutes(), //分 
	    "s+": this.getSeconds(), //秒 
	    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	    "S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
	if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
	
/* GET token create. */
router.post('/', function(req, res) {
	var db = req.db;
	var model = req.model
	var scheduleManager = req.scheduleManager
	var Config = req.config;
	
	console.log('config.PUSH_SERVER_URL='+req.config.PUSH_SERVER_URL);
	console.log(req.query);
	
	
	var   s   =  req.body.time;    
	var startDate  =   new   Date(Date.parse(s.replace(/-/g,   "/")));   
	console.log(startDate)
	
	// var startDate = moment("2014-10-17 20:30:00",       "YYYY-MM-DD HH:mm:ss");
	
	var now = new Date();
	
	var mmsec = - getOffDays(startDate,now);
	console.log('mmsec='+mmsec);
	
	if (mmsec < 0){
	 res.status(200).json({
		 status:{
			 code: 10001,
			 msg : 'error,指定的时间不正确，比当前时间少，或者服务器时间设置不正确'
		 }
	 });
	}
	//
	// - _id
	// - time
	// - desc
	// - callback_url
	// - is_finished
	// - create_at
	var time		 					= mmsec;
	var desc							= req.body.desc;
	var callback_url 			= Config.PUSH_SERVER_URL;
	var is_finished 			= 0;
	var callback_param		= req.body.data;
	
	if(req.body.is_finished && req.body.is_finished != 0){
		is_finished = req.body.is_finished;
	}
	//
	
	var callback_param_base64 = callback_param;
	
	var new_task = new model.TaskModel({
		time				: time ,
		desc				: desc,
		callback_url: callback_url,
		is_finished : is_finished,
		is_stop 		: 0,
		callback_param: callback_param_base64
	});
	
	console.log('callback_param_base64= ' + callback_param_base64)

	new_task.save(function (err, new_task) {
	  if (err) return console.error(err);

		 scheduleManager.addTask(new_task._id,new_task.time,new_task.callback_url);
		 console.log('[TASK QUEUE LOG] add task in queue,if timeout no response,please checkout redis start way');
		 
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
		
		console.log("已经找到对应的task");
		
 
		// TODO: 此时应使用post方法完成
		
		var url      = task.callback_url; 
		
		console.log("task callback地址：" + url + '?param=' + task.callback_param);
		//"
		var d = { 	token:'B1504D99F0C0DB8048709EC58BACD4A1054CB331C57627A042E72CE1DFC6873F', 	alert:'这是我的消息,你妹啊1211221', 	payload:{     "status": {         "dfsdsf": 0,         "msg": "success"     } }, 	badge:'1' }
		console.log('JSON.stringify(d)='+JSON.stringify(d))
		var a = new Buffer(JSON.stringify(d)).toString('base64');
		var z = JSON.parse(new Buffer( task.callback_param, 'base64').toString())
		
		console.log('z=' + z);
		
		// var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");
		eval("{'"+ z + "'}");
		// a= eyJ0b2tlbiI6IkIxNTA0RDk5RjBDMERCODA0ODcwOUVDNThCQUNENEExMDU0Q0IzMzFDNTc2MjdBMDQyRTcyQ0UxREZDNjg3M0YiLCJhbGVydCI6Iui/meaYr+aIkeeahOa2iOaBryzkvaDlprnllYoxMjExMjIxIiwicGF5bG9hZCI6eyJzdGF0dXMiOnsiZGZzZHNmIjowLCJtc2ciOiJzdWNjZXNzIn19LCJiYWRnZSI6IjEifQ==
		console.log('XXXXXX =' + z.token);
		
		request.post({url:url, form: z}, function optionalCallback(err, httpResponse, body) {
		  if (err) {
		    console.error('upload failed:', err);
				console.log("task callback发出请求失败！！！！");
				return 
		  }
			console.log("task callback已成功发出请求");
		  console.log('Upload successful!  Server responded with:', body);
		});
		
		
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
