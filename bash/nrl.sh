#!/bin/bash
HOLIDAYURL=enlightenment
MAROON="113,0,10"
BLUE="66,141,198"
WHITE="100,100,100"
SECONDS=2
SLEEPDURATION=$(($SECONDS*2))
STEPS=$(($SECONDS*50))

sendjson() {
    echo -e "\n$1 $2"
    curl -X PUT -d $2 http://"$HOLIDAYURL"/iotas/0.1/device/moorescloud.holiday/localhost/$1
}
pause() {
    sleep $SLEEPDURATION
}
on() {
    sendjson gradient \{\"begin\":[0,0,0],\"end\":[$1],\"steps\":$STEPS\}
    echo -e "\n\nUse '$0 off' to turn lights off"
}
off() {
    sendjson gradient \{\"begin\":[0,0,0],\"end\":[0,0,0],\"steps\":1\}
}
cycle() {
    echo -e "$SECONDS seconds, $STEPS steps."
    while (( 1 ))
    do
        sendjson gradient \{\"begin\":[$2],\"end\":[$1],\"steps\":$STEPS\}
        pause
        sendjson gradient \{\"begin\":[$1],\"end\":[$2],\"steps\":$STEPS\}
        pause
    done
}

if [[ $1 == off ]];then
    off

elif [[ $1 == maroons ]]; then
    if [[ $2 == cycle ]]; then
        cycle $WHITE $MAROON
    else
        on $MAROON
    fi

elif [[ $1 == blues ]]; then
    if [[ $2 == cycle ]]; then
        cycle $WHITE $BLUE
    else
        on $BLUE
    fi

elif [[ $1 == cycle ]]; then
    cycle $MAROON $BLUE

else

    cat << EOF
Usage:
$0 off        Turn lights off
$0 maroons    Set lights to maroon
$0 blues      Set lights to blue
$0 cycle      Cycle between maroon and blue
EOF

fi

