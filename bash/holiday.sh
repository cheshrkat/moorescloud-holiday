#!/bin/bash

SLEEPDURATION=1
HOLIDAYURL=enlightenment

sendfile() {
    echo -e "\n$1 $2"
    curl -X PUT -d @$2.json http://"$HOLIDAYURL"/iotas/0.1/device/moorescloud.holiday/localhost/$1
}
sendjson() {
    echo -e "\n$1 $2"
    curl -X PUT -d $2 http://"$HOLIDAYURL"/iotas/0.1/device/moorescloud.holiday/localhost/$1
}
pause() {
    sleep $SLEEPDURATION
}

# Because we're loading json files relative to the script, we need to be sure 
# the script is running in the right place even if invoked elsewhere.
cd "$( dirname "${BASH_SOURCE[0]}" )"

if [[ $1 == off ]];then
    sendfile setlights off

elif [[ $1 == on ]]; then
    sendfile setlights on

elif [[ $1 == randomgrad ]]; then
    # this one is nicked directly from http://support.moorescloud.com/2013/12/the-gradient-api-in-brief/
    BEGINR="0"
    BEGING="0"
    BEGINB="0"
    while ((1))
        do
         ENDR=$(($RANDOM % 255))
         ENDG="0"
         ENDB=$(($RANDOM % 255))
         #JSON=\{\"begin\"\: \[ $BEGINR, $BEGING, $BEGINB \], \"end\"\: \[ $ENDR, $ENDG, $ENDB \], \"steps\"\: 50 \}
         #echo $JSON
         BEGINER=[$BEGINR,$BEGING,$BEGINB]
         ENDER=[$ENDR,$ENDG,$ENDB]
         echo $BEGINER,$ENDER
         JSON={\"begin\":$BEGINER,\"end\":$ENDER,\"steps\":50}
         echo $JSON
         curl -X PUT -d $JSON http://$HOLIDAYURL/iotas/0.1/device/moorescloud.holiday/localhost/gradient
         sleep 1.1
         BEGINR=$ENDR
         BEGING=$ENDG
         BEGINB=$ENDB
    done

elif [[ $1 == gradientfile ]]; then
    while (( 1 ))
    do
        sendfile gradient grad-red
        pause
        sendfile gradient grad-red-down
        pause
        sendfile gradient grad-green
        pause
        sendfile gradient grad-green-down
        pause
    done

elif [[ $1 == gradient ]]; then
    # whole seconds only. bash doesn't really dig floating points.
    SECONDS=1
    STEPS=$(($SECONDS*50))
    while (( 1 ))
    do
        sendjson gradient \{\"begin\":[0,0,0],\"end\":[0,100,0],\"steps\":$STEPS\}
        sleep $SECONDS
        sendjson gradient \{\"begin\":[0,100,0],\"end\":[0,0,0],\"steps\":$STEPS\}
        sleep $SECONDS
        sendjson gradient \{\"begin\":[0,0,0],\"end\":[100,0,0],\"steps\":$STEPS\}
        sleep $SECONDS
        sendjson gradient \{\"begin\":[100,0,0],\"end\":[0,0,0],\"steps\":$STEPS\}
        sleep $SECONDS
    done

elif [[ $1 == cycle ]]; then

    while (( 1 ))
    do
        sendfile setlights red
        pause
        sendfile setlights rgbwn
        pause
    done

else

    cat << EOF
Usage:
$0 gradient         Run through gradients, sending JSON directly
$0 gradientfile     Run through gradients, sending JSON from files
$0 randomgrad       Run through random gradients
$0 cycle            Cycle between red and varied colours
$0 on               Turn lights on (white)
$0 off              Turn lights off
EOF

fi

