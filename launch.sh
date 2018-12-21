#!/bin/bash          
# TO LAUNCH use BASH: bash launch.sh
#echo Launching launch.sh
#tab ./database_service/index.js
#nodemon ./database_service/index.js
#nodemon ./kafka_service/index.js
#nodemon ./email_service/app.js
shopt -s nocasematch
read -p "Launch Node Services in New Tabs? (y/n): " response
if [[ $response == y ]]; then
    printf " Loading....\\n"
    for ((x = 0; x<3; x++)); do
        printf " Open %s Terminal\\n" $x
        osascript -e 'tell application "Terminal" to do script ""' >/dev/null
    done
fi
shopt -u nocasematch
