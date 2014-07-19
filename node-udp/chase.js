
var args = process.argv,
    b = args[2] || 100, // brightness
    interval = args[3] || 500,
    holidayName = args[4] || 'enlightenment';

var Holiday = require('holiday-udp'),
    holiday = new Holiday(holidayName);

var frame = [
    [b,0,0], [0,b,0], [0,0,b], [b,b,b], [b,b,b],
    [b,0,0], [0,b,0], [0,0,b], [b,b,b], [b,b,b],
    [b,0,0], [0,b,0], [0,0,b], [b,b,b], [b,b,b],
    [b,0,0], [0,b,0], [0,0,b], [b,b,b], [b,b,b],
    [b,0,0], [0,b,0], [0,0,b], [b,b,b], [b,b,b],
    [b,0,0], [0,b,0], [0,0,b], [b,b,b], [b,b,b],
    [b,0,0], [0,b,0], [0,0,b], [b,b,b], [b,b,b],
    [b,0,0], [0,b,0], [0,0,b], [b,b,b], [b,b,b],
    [b,0,0], [0,b,0], [0,0,b], [b,b,b], [b,b,b],
    [b,0,0], [0,b,0], [0,0,b], [b,b,b], [b,b,b],
];

function shiftFrame() {
    var shifted = frame.shift();
    frame.push(shifted);
}
function setLights() {
    holiday.send(frame, shiftFrame);
}

var startTheChase = global.setInterval(setLights,interval);
console.log("node chase.js <brightness 0-255 (100)> <interval in ms (500)> <holiday name (englightenment)>");
console.log("ctrl+c to stop lights");
