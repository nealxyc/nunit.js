# !/bin/bash
# Copy files
ROOT=$(pwd)
echo 'Root folder: ' $ROOT
cd $ROOT
open "http://localhost:8001/test/"
node server.js  > http.log 2> http.err &

