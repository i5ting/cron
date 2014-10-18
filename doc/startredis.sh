#! /bin/bash

nohup redis-server  --notify-keyspace-events Ex  --loglevel verbose >./redis-server.log 2>&1 &
