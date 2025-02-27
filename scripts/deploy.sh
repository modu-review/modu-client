#!/bin/bash

PROJECT_ROOT='/home/ubuntu/deploy'
PROJECT_NAME='Modu-Review-Client'
NVM_DIR="/home/ubuntu/.nvm"

current_time=$(date "+%y-%m-%d-%H-%M-%S")
DeployLogFile="/home/ubuntu/log/DeployLog_$current_time.log"

cd $PROJECT_ROOT

echo "Loading NVM environment : $current_time" >> $DeployLogFile
export NVM_DIR='$HOME/.nvm'
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
echo "" && echo "" >> $DeployLogFile 2>&1

PM2_PATH="/home/ubuntu/.nvm/versions/node/v22.14.0/bin/pm2"

echo "Modu-Review-Client Deploy : $current_time" >> $DeployLogFile

echo "Install Dependencies : $current_time" >> $DeployLogFile
pnpm install >> $DeployLogFile 2>&1
echo "" && echo "" >> $DeployLogFile 2>&1

echo "Shut down an existing server : $current_time" >> $DeployLogFile
$PM2_PATH delete $PROJECT_NAME >> $DeployLogFile 2>&1

echo "Run the server : $current_time" >> $DeployLogFile
$PM2_PATH start "pnpm start" --name $PROJECT_NAME
echo "" && echo "" >> $DeployLogFile 2>&1

$PM2_PATH ps && $PM2_PATH ps >> $DeployLogFile 2>&1

echo "Successful deployment and server execution: $current_time" >> $DeployLogFile 2>&1