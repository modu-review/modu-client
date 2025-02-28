#!/bin/bash
source ~/.bashrc
echo "SERVER_IP: $SERVER_IP" >> $LOG_FILE

DEPLOY_PATH="/home/ubuntu/deploy"

PROJECT_ROOT="/home/ubuntu/releases"
CURRENT_TIME=$(date "+%y-%m-%d-%H-%M-%S")
RELEASE_PATH="$PROJECT_ROOT/$CURRENT_TIME"

PM2_PATH="/home/ubuntu/.nvm/versions/node/v22.14.0/bin/pm2"

SYMLINK_PATH="/home/ubuntu/application"
PROJECT_NAME='Modu-Review-Client'

LOG_FILE="/home/ubuntu/log/DeployLog_$CURRENT_TIME.log"

NVM_DIR="/home/ubuntu/.nvm"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "현재 실행 중인 포트를 확인합니다. : $CURRENT_TIME" >> $LOG_FILE
CURRENT_PORT=$(sed -n "s/^set \$service_url http:\/\/$SERVER_IP:\([0-9]*\);/\1/p" /etc/nginx/conf.d/service-url.inc)
echo "" && echo "" >> $LOG_FILE 2>&1

if [ $CURRENT_PORT -eq 3000 ]; then
    NEW_PORT=3001
    OLD_NAME="next-blue"
    NEW_NAME="next-green"
else
    NEW_PORT=3000
    OLD_NAME="next-green"
    NEW_NAME="next-blue"
fi

echo "모두의 리뷰 새로운 버전을 $NEW_PORT 포트에서 실행합니다. : $CURRENT_TIME" >> $LOG_FILE
echo "" && echo "" >> $LOG_FILE 2>&1

mv $DEPLOY_PATH $RELEASE_PATH
mkdir $DEPLOY_PATH
ln -sfn $RELEASE_PATH $SYMLINK_PATH
cd $SYMLINK_PATH

echo "필요한 의존성을 설치합니다. : $CURRENT_TIME" >> $LOG_FILE
pnpm install >> $LOG_FILE 2>&1
echo "" && echo "" >> $LOG_FILE 2>&1

echo "서버를 실행합니다. : $CURRENT_TIME" >> $LOG_FILE
$PM2_PATH start "node_modules/next/dist/bin/next" --name $NEW_NAME -- --port $NEW_PORT >> $LOG_FILE
echo "" && echo "" >> $LOG_FILE 2>&1

echo "Health Check를 수행합니다. : $CURRENT_TIME" >> $LOG_FILE
HEALTH_CHECK_SUCCESS=false

for i in {1..20}; do
    echo "Health Check 시도 $i / 20" >> $LOG_FILE
    status_code=$(curl -s -o /dev/null -w "%{http_code}" http://$SERVER_IP:$NEW_PORT)
    echo "Health Check HTTP 상태 코드: $status_code" >> $LOG_FILE
    
    if [ $status_code -eq 200 ]; then
        echo "새로운 버전이 정상적으로 작동 중입니다. : $CURRENT_TIME" >> $LOG_FILE
        HEALTH_CHECK_SUCCESS=true
        break
    else
        echo "Health Check에 실패해 5초 후 재시도합니다. : $CURRENT_TIME" >> $LOG_FILE
        sleep 5
    fi
done

if [ $HEALTH_CHECK_SUCCESS = false ]; then
    echo "Health Check에 모두 실패해 배포를 중단합니다. : $CURRENT_TIME" >> $LOG_FILE
    $PM2_PATH delete $NEW_NAME >> $LOG_FILE 2>&1
    exit 1
fi

echo "" && echo "" >> $LOG_FILE 2>&1

echo "Nginx 프록시 포트를 $CURRENT_PORT 에서 $NEW_PORT 로 변경합니다 : $CURRENT_TIME" >> $LOG_FILE
echo "set \$service_url http://$SERVER_IP:${NEW_PORT};" | sudo tee /etc/nginx/conf.d/service-url.inc
sudo service nginx reload
echo "" && echo "" >> $LOG_FILE 2>&1

echo "기존 서버를 종료합니다 : $CURRENT_TIME" >> $LOG_FILE
$PM2_PATH delete $OLD_NAME >> $LOG_FILE 2>&1
