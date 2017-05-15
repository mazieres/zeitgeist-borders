#!/bin/bash

CompileDaemon -build="go build -o server.bin server.go" -command="./server.bin | tee -a server.log" -exclude-dir=".git" -exclude-dir="www"
