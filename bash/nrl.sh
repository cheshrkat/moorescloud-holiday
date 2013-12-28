#!/bin/bash
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

elif [[ $1 == maroons ]]; then
    sendfile colour-qld

elif [[ $1 == blues ]]; then
    sendfile colour-nsw

elif [[ $1 == cycle ]]; then

    while (( 1 ))
    do
        sendfile colour-qld
        sleep 1
        sendfile colour-nsw
        sleep 1
    done

else

    cat << EOF
Usage:
$0 off        Turn lights off
$0 maroons    Set lights to maroon
$0 blues      Set lights to blue
$0 cycle      Cycle between maroon and blue
EOF

fi

