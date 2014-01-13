var Holiday = require('holiday-udp'),
    holiday = new Holiday('enlightenment'),
    args = process.argv,
    command = args[2],
    fill = (args[3]) ? [args[3],args[3],args[3]] : [100,100,100],
    chase = (args[4]) ? [args[4],args[4],args[4]] : [0,100,0],
    frame = [],
    interval = args[5] || 100;

// print process.argv
// process.argv.forEach(function (val, index, array) {
//   console.log(index + ': ' + val);
// });

console.log("Holiday: " + holiday.address);

function done() {
    process.exit(0);
}

function createFrame(filler,chaser) {
    console.log("filler: " + filler);
    if (chaser) {
        console.log("chaser: " + chaser);
        fillLength = 50 - chaser.length;
        frame.push(chaser);
    }
    for (var i = 0; i < 50; i++) {
        frame.push(filler);
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

function startTheChase() {
    frame = createFrame(fill,chase);
    var startTheChase = global.setInterval(setLights,interval);
    console.log("ctrl+c to stop lights");
}

switch (command) {
    case "on":
        on();
        break;
    case "off":
        off();
        break;
    case "chase":
        startTheChase();
        break;
    default:
        console.log()
        console.log("Options:");
        console.log("on <fill 0-255>");
        console.log("off");
        console.log("chase <fill 0-255> <chase 0-255> <interval ms>");
        break;
}
