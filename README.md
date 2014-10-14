cron
====

## tech stack

- express 
- redis


## features




## 原理

增加调度，等触发调度的时候，对外发送请求，这样就能够做到通用了


![](doc/shiyi.png)


### 阶段1：根据时间，实现基础的延时调度


### 阶段2：引入crontab一样的表达式，支持更多调度

https://github.com/bunkat/later

此时的任务，会发给阶段1的基础延时调度来处理

### 阶段3：触发之后对外发送http请求，此处可以负载

### 总结

通过3个阶段的处理，可以完成大规模的部署


## Table

- _id
- time
- desc
- callback_url
- is_finished
- create_at

情景

2014-11-11 11：10 财神给小墨发送消息

## todo

- [ ] 增加一个调度
- [ ] 移除一个调度
- [ ] 获取调度列表
- [ ] 查看调度详情



## url

- https://github.com/i5ting/redis-scheduler
