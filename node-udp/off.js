var args = process.argv,
    holidayName = args[2] || 'enlightenment',
    Holiday = require('holiday-udp'),
    holiday = new Holiday(holidayName);

// This is a bit contrived/unusual, but since the on/off demos are so simple 
// it makes sense to exit the process immediately as they can't do anything more.
function successCallback() {
    console.log("...and done!");
    process.exit(0); // stops the script http://nodejs.org/api/process.html#process_process_exit_code
}

console.log("Usage: node off.js <holidayname>");
console.log("Holiday named " + holiday.address + " lights off...");
holiday.send([ ], successCallback);

// Sending [ ] is a cheat/shorthand to sending all-zero values. It's equivalent to...
// var frame = [
//     [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0],
//     [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0],
//     [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0],
//     [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0],
//     [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0],
//     [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0],
//     [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0],
//     [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0],
//     [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0],
//     [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0]
// ];
//
// or..
//
// var frame = [ ];
// holiday.send(frame, successCallback);
