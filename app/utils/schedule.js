var redis = require("redis"),

// create a client to subscribe to the notifications
subscriberClient = redis.createClient(),

// create a client which adds to the scheduled queue
schedQueueClient = redis.createClient();

// when a published message is received...
subscriberClient.on("pmessage", function (pattern, channel, expiredKey) {
    console.log("Task triggerd : key ["+  expiredKey +"] has expired");
    //TODO: push expiredKey onto some other list to proceed to order fulfillment

    // subscriberClient.quit();
});

// subscribe to key expire events on database 0
subscriberClient.psubscribe("__keyevent@0__:expired");


// schedule ORDER_ID "order_1234" to expire in 10 seconds

var addTask = function(key,time,url){
	// set("order_1234", "", "PX", 1000, redis.print);
	console.log('add task'+key + ' time='+time + ' url='+url);
	
	schedQueueClient.set(key, "", "PX", time, redis.print);
}


module.exports = {
 	subscriberClient:subscriberClient,
	Manager :{
		addTask:addTask
	}
}
