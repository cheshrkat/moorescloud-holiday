function strToArray (source) {
    var strings, result = [];
    var regexMulti = /\]\s?\,\s?\[/g; // ],[
    var regexBrackets = /[\[\]]/g; // [ and ]

    function convertToArr(str) {
        var sourcestr = str.replace(regexBrackets,'');
        var arr = sourcestr.split(',');
        // coerce number strings
        for(var i=0, ii = arr.length; i<ii; i++) {
            if ( !isNaN(arr[i]) ) {
                arr[i] = +arr[i];
            }
        }
        return arr;
    }

    if (typeof(source) === 'string') {
        if (regexMulti.test(source)) {
            strings = source.split(regexMulti);
            for (var i = 0, ii = strings.length; i < ii; i++) {
                result.push( convertToArr(strings[i]) );
            }
        } else {
            result = convertToArr(source);
        }
        return result;
    } else {
        return 'Error: input not a string.';
    }

}

var Holiday = require('holiday-udp'),
    holiday = new Holiday('enlightenment'),
    frame = [],
    args = process.argv,
    command = args[2],
    fill = [50,50,50],
    runner = (args[4]) ? strToArray(args[4]) : [[0,255,0],[0,10,0],[0,5,0]],
    interval = args[5] || 100;

console.log("Holiday name: " + holiday.address);

if (args[3]) {
    if (args[3].length < 4) {
        fill = [args[3],args[3],args[3]];
    } else {
        fill = strToArray(args[3]);
    }
}

function done() {
    console.log("Done.");
    process.exit(0);
}

function createFrame(filler,runner) {
    var fillLength = 50;

    for (var ii = 0; ii < fillLength; ii++) {
        frame.push(filler);
    }
    console.log("filler: " + JSON.stringify(filler));

    if (runner) {
        var runLen = runner.length;
        fillLength = fillLength - runLen;
        for (var i = 0; i < runLen; i++) {
            frame.push(runner[i]);
        }
        console.log("runner: " + JSON.stringify(runner));
        console.log("Lengths: runner - " + runner.length + ", filler - " + fillLength);
    }
    
    return frame;
}

function shiftFrame() {
    var shifted = frame.shift();
    frame.push(shifted);
}

function setLights() {
    holiday.send(frame, shiftFrame);
}

function on() {
    holiday.send(createFrame(fill), done);
}

function off() {
    holiday.send([ ], done);
}

function startTheRunner() {
    frame = createFrame(fill,runner);
    var gogogo = global.setInterval(setLights,interval);
    console.log("ctrl+c to stop lights");
}

switch (command) {
    case "on":
        on();
        break;
    case "off":
        off();
        break;
    case "runner":
        startTheRunner();
        break;
    default:
        console.log();
        console.log("Options:");
        console.log("on <fill 0-255>");
        console.log("off");
        console.log("runner '<fill [0-255,0-255,0-255]>' '<chase [0-255,0-255,0-255]>' <interval ms>");
        break;
}
