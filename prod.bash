#!/bin/bash

echo "Building server..."
/usr/local/go/bin/go build -o server.bin server.go
echo "Lauching server..."
./server.bin | tee -a server.log
