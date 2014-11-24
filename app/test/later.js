var later = require('later');
var dateFormat = require('dateformat');

later.date.localTime();

// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}  

// console.log("Now:"+new Date());
var demo1_a = {schedules: [{h_a: [17]}]};
var demo2_b = {schedules: [{h_b: [17]}]};

// var occurrences = later.schedule(demo1_a).next(3);
// for(var i = 0; i < occurrences.length; i++) {
//     console.log(occurrences[i]);
// }


// var cron = later.parse.cron('5 * * * *');
//
// occurrences = later.schedule(demo2_b).next(3);
// for(var i = 0; i < occurrences.length; i++) {
//     console.log(occurrences[i]);
// }

//
// 时间控制API
//
// later.schedule(schedule).next(count, start, end): 取下N个有效时间点
// later.schedule(schedule).prev(count, start, end): 取上N个有效时间点
// later.schedule(schedule).nextRange(count, start, end): 取下N个有效时间段
// later.schedule(schedule).prevRange(count, start, end): 取上N个有效时间段


var cron = '1 * * * * *';
var s = later.parse.cron(cron);

var occurrences = later.schedule(s).next(100);

// occurrences = later.schedule(demo2_b).next(3);
for(var i = 0; i < occurrences.length; i++) {
	  var now = new Date(occurrences[i]); 
    var d = dateFormat(now, "yyyy:mm:dd h:MM:ss TT");
		console.log(d);
}