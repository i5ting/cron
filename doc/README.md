# Cron资料整理


## later

a npm 

http://stackoverflow.com/questions/7877914/getting-datetimes-from-cron-format-using-javascript



You might want to check out [Later.js](https://github.com/bunkat/later) which can parse a Cron expression and calculate the next occurrences.

var schedule = cronParser().parse('* */5 * * * *', true);
var results = later(60).get(schedule, 100, startDate, endDate);

http://blog.fens.me/tag/cron/

## cronner
 
还不错

https://bitbucket.org/nevity/cronner/src/7c8cbe77697c?at=master


## cronmaker

http://www.cronmaker.com/

http://www.cronmaker.com/help/api-help.html

## crontrigger

http://www.quartz-scheduler.org/documentation/quartz-1.x/tutorials/crontrigger

## parse-cron

ruby version

https://github.com/siebertm/parse-cron

## cron-parser

node version

https://github.com/harrisiirak/cron-parser

## cron

go  with next function

https://github.com/robfig/cron

- https://godoc.org/github.com/robfig/cron#SpecSchedule.Next
- https://github.com/robfig/cron/blob/master/spec.go#L57

