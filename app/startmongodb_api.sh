#! /bin/bash

mkdir -p ./data/mongodb

mongod --dbpath ./data/mongodb  --logpath ./mongodb.log &
