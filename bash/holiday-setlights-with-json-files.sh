#!/bin/bash
#
# Do things rather quickly if we can
# Better to keep things to 10 hz if possible, just because
#
SLEEPDURATION=.1
HOLIDAYURL=enlightenment

sendfile() {
    echo -e "\n$1"
    curl -X PUT -d @$1.json http://"$HOLIDAYURL"/iotas/0.1/device/moorescloud.holiday/localhost/setlights    
}
pause() {
    sleep $SLEEPDURATION
}

if [[ $1 == off ]];then
    sendfile off

elif [[ $1 == cycle ]]; then

    while (( 1 ))
    do
        sendfile red
        pause
        sendfile rgbwn
        pause
    done

else

    cat << EOF
Usage:
$0 off        Turn lights off
$0 cycle      Cycle between red and varied colours
EOF

fi

