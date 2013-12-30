var Holiday = require('holiday-udp'),
    holiday = new Holiday('enlightenment');

// This is a bit contrived/unusual, but since the on/off demos are so simple 
// it makes sense to exit the process immediately as they can't do anything more.
function successCallback() {
    console.log("Shutting down the script");
    process.exit(0); // stops the script http://nodejs.org/api/process.html#process_process_exit_code
}

var frame = [
    [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0],
    [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0],
    [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0],
    [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0],
    [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0],
    [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0],
    [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0],
    [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0],
    [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0],
    [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0]
];

console.log("Holiday " + holiday.address + " lights off...");
holiday.send(frame, successCallback);